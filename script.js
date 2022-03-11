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

      for (const [index, question] of data.questions.entries()) {
        //console.log(index);
        let qeDiv = document.createElement("div");
        qeDiv.classList.add("questions");
        qeDiv.setAttribute("id", "questions" + String(index));
        let addQeDiv = document.getElementById("export");
        qeDiv.appendChild(stringToHTML(question.content).querySelector("div"));
        addQeDiv.appendChild(qeDiv);
        for (const [i, answer] of question.answers.entries()) {
          //console.log(stringToHTML(question.content).querySelector("div"));
          let anDiv = document.createElement("div");
          anDiv.classList.add("answers");
          anDiv.setAttribute("id", "answers");
          let addAnDiv = document.getElementById("questions" + String(index));
          anDiv.appendChild(stringToHTML(answer.content).querySelector("div"));
          addAnDiv.appendChild(anDiv);
        }
      }
    })
    .catch((error) => {
      let id = parseInt(document.getElementById("name").value, 10) + 151;
      console.log(id + " NOT FOUND");
    });
}
