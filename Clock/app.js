const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
  const now = new Date();
  const second = now.getSeconds();
  const secondDeg = (second / 60) * 360 + 90;
  const minute = now.getMinutes();
  const minuteDeg = (minute / 60) * 360 + 90;
  const hour = now.getHours();
  const hourDegree = (hour / 24) * 360 + 90;

  secondHand.style.transform = `rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDegree}deg)`;
}

setInterval(setDate, 1000);
