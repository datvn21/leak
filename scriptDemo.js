<<<<<<< HEAD
console.log("Yuuta");
let id = 0;
let min = 140;

function ABCD(num) {
  if (num == 0) {
    tag = "A";
  }
  if (num == 1) {
    tag = "B";
  }
  if (num == 2) {
    tag = "C";
  }
  if (num == 3) {
    tag = "D";
  }
  if (num == 4) {
    tag = "E";
  }
  if (num == 5) {
    tag = "F";
  }
  return tag;
}

function HTMLtoOnlyText(html) {
  //console.log(html.childNodes[0].childNodes[0].childNodes);
  return html.textContent;
}


function showhide() {
  if (document.getElementById("tool").style.display == "flex") {
    document.getElementById("tool").style.display = "none";
  } else {
    document.getElementById("tool").style.display = "flex";
  }
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
    document.getElementById("btn").click();
    return false;
  }
  return true;
}

function save() {
  var width = $(window).width();
  if (width > 600) {
    document.getElementById("tool").style.display = "none";
    document.getElementById("btn").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("tool").style.cssText =
      "animation-name: screenShot;animation-duration: 0.5s;width:0px;border: none";
    document.getElementById("export").style.cssText =
      "margin-left: 0%;width: 100%;";
  }
  var element = document.getElementById("export");
  var opt = {
    margin: 1,
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  setTimeout(function () {
    html2pdf().set(opt).from(element).save();
  }, 1000);
  setTimeout(function () {
    if (width > 600) {
      document.getElementById("tool").style.display = "flex";
      document.getElementById("btn").style.display = "initial";
      document.getElementById("name").style.display = "initial";
      document.getElementById("tool").style.cssText =
        "animation-name: screenShotReset;animation-duration: 0.5s;width:50%;";
      document.getElementById("export").style.cssText =
        "margin-left: 50%;width: 50%;";
    }
  }, 1500);
}

const stringToHTML = (str) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

const stringNameTest = () => {
  get(document.getElementById("name").value);
};

function get(id) {
  resetOutput("questions");
  //console.log("Waitting...");
  document.getElementById("load").style.cssText =
    "animation-name: load;animation-duration: 0.5s;";
  jQuery
    .getJSON("/json/" + String(id) + ".json")
    .then((data) => {
      console.log(data.questions);
      console.log("Size of Exam: " + data.questions.length + " questions");
      var width = $(window).width();
      if (width <= 600) {
        document.getElementById("tool").style.display = "none";
      } else {
        document.getElementById("tool").style.display = "flex";
      }
      document.getElementById("save").style.display = "initial";
      setTimeout(function () {
        document.getElementById("load").style.display = "none";
      }, 500);

      for (let i = 0; i < data.questions.length; i++) {
        let question = data.questions[i].content;
        html = stringToHTML(question);
        childeNodeHTML = html.childNodes[0].childNodes[0].childNodes;
        var profile = new Image();
        console.log(childeNodeHTML);
        for (let numm = 0; numm < childeNodeHTML.length; numm++) {
          if (childeNodeHTML[numm].localName == "img") {
            chhildd = childeNodeHTML[numm];
            profile.src = chhildd.attributes[0].nodeValue;
          }
        }
        question =
          String(i + 1) + ". " + String(HTMLtoOnlyText(stringToHTML(question)));
        //console.log(question);
        let qeDiv = document.createElement("div");
        qeDiv.classList.add("questions");
        qeDiv.setAttribute("id", "questions" + String(i));
        let addQeDiv = document.getElementById("export");
        let qe = document.createTextNode(question);
        qeDiv.appendChild(qe);
        qeDiv.appendChild(profile);
        addQeDiv.appendChild(qeDiv);
        try {
          for (let z = 0; z < data.questions[i].questions.length; z++) {
            let questionChild = data.questions[i].questions[z].content;
            questionChild =
              String(z + 1) +
              ". " +
              String(HTMLtoOnlyText(stringToHTML(questionChild))).replace(
                "/&nbsp;/g",
                ""
              );
            //console.log(questionChild);
            let qeChildDiv = document.createElement("div");
            qeChildDiv.classList.add("questions-child");
            qeChildDiv.setAttribute(
              "id",
              "questions" + String(i) + "questions-child" + String(z)
            );
            let addQeChildDiv = document.getElementById(
              "questions" + String(i)
            );
            let qeChild = document.createTextNode(questionChild);
            qeChildDiv.appendChild(qeChild);
            addQeChildDiv.appendChild(qeChildDiv);
            for (
              let j = 0;
              j < data.questions[i].questions[z].answers.length;
              j++
            ) {
              let answer = data.questions[i].questions[z].answers[j].content;
              answer =
                ABCD(j) +
                ". " +
                String(HTMLtoOnlyText(stringToHTML(answer))).replace(
                  "/&nbsp;/g",
                  ""
                );
              //console.log(answer);
              let ansDiv = document.createElement("li");
              if (data.questions[i].questions[z].answers[j].trueAnswer == 1) {
                ansDiv.classList.add("answers-right");
              } else {
                ansDiv.classList.add("answers");
              }
              ansDiv.setAttribute("id", "answers");
              let addAnsDiv = document.getElementById(
                "questions" + String(i) + "questions-child" + String(z)
              );
              let ans = document.createTextNode(answer);
              ansDiv.appendChild(ans);
              addAnsDiv.appendChild(ansDiv);
            }
          }
        } catch (error) {
          for (let j = 0; j < data.questions[i].answers.length; j++) {
            let answer = data.questions[i].answers[j].content;
            html = stringToHTML(answer);
            childeNodeHTML = html.childNodes[0].childNodes[0].childNodes;
            var profile = new Image();
            console.log(childeNodeHTML);
            for (let numm = 0; numm < childeNodeHTML.length; numm++) {
              if (childeNodeHTML[numm].localName == "img") {
                chhildd = childeNodeHTML[numm];
                profile.src = chhildd.attributes[0].nodeValue;
              }
            }
            answer =
              ABCD(j) +
              ". " +
              String(HTMLtoOnlyText(stringToHTML(answer)))
                .replaceAll("&nbsp;", "")
                .replace("/&nbsp;/g", "");
            //console.log(answer);

            let ansDiv = document.createElement("li");
            if (data.questions[i].answers[j].trueAnswer == 1) {
              ansDiv.classList.add("answers-right");
            } else {
              ansDiv.classList.add("answers");
            }
            ansDiv.setAttribute("id", "answers");
            let addAnsDiv = document.getElementById("questions" + String(i));
            let ans = document.createTextNode(answer);
            ansDiv.appendChild(ans);
            ansDiv.appendChild(profile);
            addAnsDiv.appendChild(ansDiv);
          }
        }
      }
    })
    .catch((error) => {
      let id = parseInt(document.getElementById("name").value, 10) + 151;
      console.log(id + " NOT FOUND");
    });
}
=======
console.log("Yuuta");
let id = 0;
let min = 140;

function ABCD(num) {
  if (num == 0) {
    tag = "A";
  }
  if (num == 1) {
    tag = "B";
  }
  if (num == 2) {
    tag = "C";
  }
  if (num == 3) {
    tag = "D";
  }
  if (num == 4) {
    tag = "E";
  }
  if (num == 5) {
    tag = "F";
  }
  return tag;
}

function HTMLtoOnlyText(html) {
  //console.log(html.childNodes[0].childNodes[0].childNodes);
  return html.textContent;
}


function showhide() {
  if (document.getElementById("tool").style.display == "flex") {
    document.getElementById("tool").style.display = "none";
  } else {
    document.getElementById("tool").style.display = "flex";
  }
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
    document.getElementById("btn").click();
    return false;
  }
  return true;
}

function save() {
  var width = $(window).width();
  if (width > 600) {
    document.getElementById("tool").style.display = "none";
    document.getElementById("btn").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("tool").style.cssText =
      "animation-name: screenShot;animation-duration: 0.5s;width:0px;border: none";
    document.getElementById("export").style.cssText =
      "margin-left: 0%;width: 100%;";
  }
  var element = document.getElementById("export");
  var opt = {
    margin: 1,
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  setTimeout(function () {
    html2pdf().set(opt).from(element).save();
  }, 1000);
  setTimeout(function () {
    if (width > 600) {
      document.getElementById("tool").style.display = "flex";
      document.getElementById("btn").style.display = "initial";
      document.getElementById("name").style.display = "initial";
      document.getElementById("tool").style.cssText =
        "animation-name: screenShotReset;animation-duration: 0.5s;width:50%;";
      document.getElementById("export").style.cssText =
        "margin-left: 50%;width: 50%;";
    }
  }, 1500);
}

const stringToHTML = (str) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

const stringNameTest = () => {
  get(document.getElementById("name").value);
};

function get(id) {
  resetOutput("questions");
  //console.log("Waitting...");
  document.getElementById("load").style.cssText =
    "animation-name: load;animation-duration: 0.5s;";
  jQuery
    .getJSON("/json/" + String(id) + ".json")
    .then((data) => {
      console.log(data.questions);
      console.log("Size of Exam: " + data.questions.length + " questions");
      var width = $(window).width();
      if (width <= 600) {
        document.getElementById("tool").style.display = "none";
      } else {
        document.getElementById("tool").style.display = "flex";
      }
      document.getElementById("save").style.display = "initial";
      setTimeout(function () {
        document.getElementById("load").style.display = "none";
      }, 500);

      for (let i = 0; i < data.questions.length; i++) {
        let question = data.questions[i].content;
        html = stringToHTML(question);
        childeNodeHTML = html.childNodes[0].childNodes[0].childNodes;
        var profile = new Image();
        console.log(childeNodeHTML);
        for (let numm = 0; numm < childeNodeHTML.length; numm++) {
          if (childeNodeHTML[numm].localName == "img") {
            chhildd = childeNodeHTML[numm];
            profile.src = chhildd.attributes[0].nodeValue;
          }
        }
        question =
          String(i + 1) + ". " + String(HTMLtoOnlyText(stringToHTML(question)));
        //console.log(question);
        let qeDiv = document.createElement("div");
        qeDiv.classList.add("questions");
        qeDiv.setAttribute("id", "questions" + String(i));
        let addQeDiv = document.getElementById("export");
        let qe = document.createTextNode(question);
        qeDiv.appendChild(qe);
        qeDiv.appendChild(profile);
        addQeDiv.appendChild(qeDiv);
        try {
          for (let z = 0; z < data.questions[i].questions.length; z++) {
            let questionChild = data.questions[i].questions[z].content;
            questionChild =
              String(z + 1) +
              ". " +
              String(HTMLtoOnlyText(stringToHTML(questionChild))).replace(
                "/&nbsp;/g",
                ""
              );
            //console.log(questionChild);
            let qeChildDiv = document.createElement("div");
            qeChildDiv.classList.add("questions-child");
            qeChildDiv.setAttribute(
              "id",
              "questions" + String(i) + "questions-child" + String(z)
            );
            let addQeChildDiv = document.getElementById(
              "questions" + String(i)
            );
            let qeChild = document.createTextNode(questionChild);
            qeChildDiv.appendChild(qeChild);
            addQeChildDiv.appendChild(qeChildDiv);
            for (
              let j = 0;
              j < data.questions[i].questions[z].answers.length;
              j++
            ) {
              let answer = data.questions[i].questions[z].answers[j].content;
              answer =
                ABCD(j) +
                ". " +
                String(HTMLtoOnlyText(stringToHTML(answer))).replace(
                  "/&nbsp;/g",
                  ""
                );
              //console.log(answer);
              let ansDiv = document.createElement("li");
              if (data.questions[i].questions[z].answers[j].trueAnswer == 1) {
                ansDiv.classList.add("answers-right");
              } else {
                ansDiv.classList.add("answers");
              }
              ansDiv.setAttribute("id", "answers");
              let addAnsDiv = document.getElementById(
                "questions" + String(i) + "questions-child" + String(z)
              );
              let ans = document.createTextNode(answer);
              ansDiv.appendChild(ans);
              addAnsDiv.appendChild(ansDiv);
            }
          }
        } catch (error) {
          for (let j = 0; j < data.questions[i].answers.length; j++) {
            let answer = data.questions[i].answers[j].content;
            html = stringToHTML(answer);
            childeNodeHTML = html.childNodes[0].childNodes[0].childNodes;
            var profile = new Image();
            console.log(childeNodeHTML);
            for (let numm = 0; numm < childeNodeHTML.length; numm++) {
              if (childeNodeHTML[numm].localName == "img") {
                chhildd = childeNodeHTML[numm];
                profile.src = chhildd.attributes[0].nodeValue;
              }
            }
            answer =
              ABCD(j) +
              ". " +
              String(HTMLtoOnlyText(stringToHTML(answer)))
                .replaceAll("&nbsp;", "")
                .replace("/&nbsp;/g", "");
            //console.log(answer);

            let ansDiv = document.createElement("li");
            if (data.questions[i].answers[j].trueAnswer == 1) {
              ansDiv.classList.add("answers-right");
            } else {
              ansDiv.classList.add("answers");
            }
            ansDiv.setAttribute("id", "answers");
            let addAnsDiv = document.getElementById("questions" + String(i));
            let ans = document.createTextNode(answer);
            ansDiv.appendChild(ans);
            ansDiv.appendChild(profile);
            addAnsDiv.appendChild(ansDiv);
          }
        }
      }
    })
    .catch((error) => {
      let id = parseInt(document.getElementById("name").value, 10) + 151;
      console.log(id + " NOT FOUND");
    });
}
>>>>>>> aac4be1299f31b588ab796dcda46d9a4f6d50e96
