"use strict";

function generateRandomNumbers() {
  return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}

const attempts = [];
let minAttempts = null;
const attempt = document.querySelector(".score");
const hint = document.querySelector(".message");

let randomNumber = generateRandomNumbers();

attempt.textContent = 0;

document.querySelector(".check").addEventListener("click", () => {
  const innerNumber = Number(document.querySelector(".guess").value);
  
  if (!innerNumber) {
    return hint.textContent = 'Введите число'
  }

  if (innerNumber >= 1 && innerNumber <= 20) {
    if (innerNumber != randomNumber) {
      attempt.textContent = Number(attempt.textContent) + 1
      if (innerNumber > randomNumber) {
        hint.textContent = "Много";
      } else if (innerNumber < randomNumber) {
        hint.textContent = "Мало";
      }
    } else {
      document.querySelector(".check").disabled = true;
      attempt.textContent = Number(attempt.textContent) + 1
      document.querySelector("body").classList.add("trueBackground");
      document.querySelector(".number").textContent = randomNumber;
      attempts.push(Number(attempt.textContent));
      console.log(attempts);
      hint.textContent = "Поздравляю";
    }
  } else {
    hint.textContent = 'Некорректное число'
  }
});

document.querySelector(".again").addEventListener("click", () => {
  document.querySelector(".check").disabled = false;
  attempt.textContent = 0;
  document.querySelector("body").classList.remove("trueBackground");
  document.querySelector(".number").textContent = "?";
  randomNumber = generateRandomNumbers();
  document.querySelector(".guess").value = "";
  
  if (attempts.length === 1) {
    minAttempts  = attempts[0];
  }

  if (attempts.length > 1) {
    for (const element of attempts) {
      if (minAttempts > element) {
        minAttempts = element;
      }
    }
  }

  document.querySelector(".highscore").textContent = minAttempts;
});
