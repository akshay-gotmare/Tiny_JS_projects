let countValue = 0;
const countElement = document.querySelector(".count");
const incrementBtn = document.querySelector(".increment-btn");
const resetBtn = document.querySelector(".reset-btn");
const decrementBtn = document.querySelector(".decrement-btn");

const handleCount = (value) => {
  if (value === 0 && countValue !== 0) {
    countValue = 0;
  } else {
    countValue += value;
  }
  countElement.innerHTML = countValue;
};

console.log(incrementBtn);
incrementBtn.onclick = () => handleCount(1);
resetBtn.onclick = () => handleCount(0);
decrementBtn.addEventListener("click", () => handleCount(-1));
