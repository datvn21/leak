console.log("Yuuta")

function stringToHTML(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
};

function HTMLtoOnlyText(html) {
    html.innerHTML = html.innerText || html.textContent;
    return html.innerHTML;
}

function ABCD(num) {
    if (num == 0) {
        tag = "A"
    }
    if (num == 1) {
        tag = "B"
    }
    if (num == 2) {
        tag = "C"
    }
    if (num == 3) {
        tag = "D"
    }
    if (num == 4) {
        tag = "E"
    }
    if (num == 5) {
        tag = "F"
    }
    return tag;
}

function showhide() {
    document.getElementById('tool').style.display = "flex";
}

function resetOutput(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function enterKeyboard(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById('btn').click();
        return false;
    }
    return true;
}

function save() {
    var width = $(window).width();
    if (width > 600) {
        document.getElementById('tool').style.display = "none";
        document.getElementById('tool').style.cssText = ('width: 0%;');
        document.getElementById('export').style.cssText = ('margin-left: 0%;width: 100%;');
    }
    var element = document.getElementById('export');
    var opt = {
        margin: 1,
        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
    setTimeout(function() {
        if (width > 600) {
            document.getElementById('tool').style.display = "flex";
            document.getElementById('tool').style.cssText = ('width: 50%;');
            document.getElementById('export').style.cssText = ('margin-left: 50%;width: 50%;');
        }
    }, 1000);
}

function run() {
    resetOutput('questions')
    console.log("Waitting...");
    jQuery.getJSON("https://raw.githubusercontent.com/datvn21/lmschecker/main/json%20demo/" + document.getElementById('name').value + ".json").then(data => {
        console.log(data);
        console.log("Size of Exam: " + data.questions.length + " questions")
        var width = $(window).width();
        if (width <= 600) {
            document.getElementById('tool').style.display = "none";
        } else {
            document.getElementById('tool').style.display = "flex";
        }
        document.getElementById('load').style.display = "none";
        for (let i = 0; i < data.questions.length; i++) {
            let question = data.questions[i].content
            question = String(i + 1) + ". " + String(HTMLtoOnlyText(stringToHTML(question))).replace("&nbsp;", "")
            console.log(question)
            let qeDiv = document.createElement("div")
            qeDiv.classList.add('questions')
            qeDiv.setAttribute('id', 'questions' + String(i))
            let addQeDiv = document.getElementById('export')
            let qe = document.createTextNode(question);
            qeDiv.appendChild(qe)
            addQeDiv.appendChild(qeDiv)
            try {
                for (let z = 0; z < data.questions[i].questions.length; z++) {
                    let questionChild = data.questions[i].questions[z].content
                    questionChild = String(z + 1) + ". " + String(HTMLtoOnlyText(stringToHTML(questionChild))).replace("&nbsp;", "")
                    console.log(questionChild)
                    let qeChildDiv = document.createElement("div")
                    qeChildDiv.classList.add('questions-child')
                    qeChildDiv.setAttribute('id', 'questions-child' + String(z))
                    let addQeChildDiv = document.getElementById('questions' + String(i))
                    let qeChild = document.createTextNode(questionChild);
                    qeChildDiv.appendChild(qeChild)
                    addQeChildDiv.appendChild(qeChildDiv)
                    for (let j = 0; j < data.questions[i].questions[z].answers.length; j++) {
                        let answer = data.questions[i].questions[z].answers[j].content
                        answer = ABCD(j) + "." + String(HTMLtoOnlyText(stringToHTML(answer))).replace("&nbsp;", "")
                        console.log(answer)
                            /*let ansDiv = document.createElement("div")
                            ansDiv.classList.add('answers')
                            ansDiv.setAttribute('id', 'answers')
                            let addAnsDiv = document.getElementById('questions-child' + String(z))
                            let ans = document.createTextNode(answer);
                            ansDiv.appendChild(ans)
                            addAnsDiv.appendChild(ansDiv)*/
                    }
                }

            } catch (error) {
                for (let j = 0; j < data.questions[i].answers.length; j++) {
                    let answer = data.questions[i].answers[j].content
                    answer = ABCD(j) + "." + String(HTMLtoOnlyText(stringToHTML(answer))).replace("&nbsp;", "")
                    console.log(answer)
                    let ansDiv = document.createElement("div")
                    if (data.questions[i].answers[j].trueAnswer == 1) {
                        ansDiv.classList.add('answers-right')
                    } else {
                        ansDiv.classList.add('answers')
                    }
                    ansDiv.setAttribute('id', 'answers')
                    let addAnsDiv = document.getElementById('questions' + String(i))
                    let ans = document.createTextNode(answer);
                    ansDiv.appendChild(ans)
                    addAnsDiv.appendChild(ansDiv)
                }
            }

        }
    }).catch(error => {
        console.error(error);
    });
}
