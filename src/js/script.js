// Js code goes here
const showLoader = () =>
  (document.getElementById("loader-view").className = "");

const hideLoader = () =>
  (document.getElementById("loader-view").className = "hide");

const hideQuiz = () => document.getElementById("quiz").classList.add("hide");
const showQuiz = () => document.getElementById("quiz").classList.remove("hide");

hideQuiz();
hideLoader();

document.getElementById("start-button").addEventListener("click", getStarted);
document
  .getElementById("submit-button")
  .addEventListener("click", submitAnswer);

function getSiblings(element, parent) {
  const children = [...parent.children];
  return children.filter((child) => child !== element);
}

function submitAnswer() {
  const el = document
    .querySelector('input[name="radio-group"]:checked')
    .closest("div");
  const answer = el.getAttribute("isAnswer");

  if (answer === "true") {
    el.classList.add("correct-answer");
  } else {
    el.classList.add("wrong-answer");
    document
      .querySelector('[isAnswer="true"]')
      .classList.add("correct-answer");
  }
}

document
  .getElementById("options-container")
  .addEventListener("click", onSelectOption);

function onSelectOption(e) {
  const element = e.target.closest("div");
  element.classList.add("user-answer");
  const siblings = getSiblings(element, element.parentElement);

  siblings.forEach((el) => el.classList.remove("user-answer"));
  document.getElementById("submit-button").disabled = false;
}

function getStarted() {
  const id = document.getElementById("current-question-id").value;

  showLoader();
  document.getElementById("pre-quiz-instructions").classList.add("hide");
  document.getElementById("start-button").classList.add("hide");

  fetchQuestions(id);
}

const getOptions = (options, answer) =>
  options.map(
    (option, index) =>
      `<div isAnswer=${
        index === answer
      }><input type="radio" name="radio-group" id="radio${index}" value=${option}/><label for="radio${index}">${option}</label></div>`
  ).join('');

function fetchQuestions(id) {
  fetch(`https://jsonmock.hackerrank.com/api/questions/${id}`)
    .then((res) => {
      res.json().then((body) => {
        // console.log(body);
        hideLoader();
        showQuiz();
        console.log(body.data);
        const { question, options, answer } = body.data;
        document.getElementById("submit-button").disabled = true;

        console.log(getOptions(
            options,
            answer
          ))

        document.getElementById("question").innerHTML = question;
        document.getElementById("options-container").innerHTML = getOptions(
          options,
          answer
        );
      });
    })
    .catch((err) => {
      throw err;
    });
}
