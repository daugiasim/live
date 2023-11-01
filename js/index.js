// Injecting the countdown into HTML document

const countdownContainer = document.querySelector(".countdown-container");

countdownContainer.innerHTML = `
    <svg id="progress-wrapper" width="500" height="500" viewBox="0 0 500 500">
      <circle cx="250" cy="250" r="200" stroke="rgb(3 69 62)" stroke-width="25" fill="transparent" id="progress" />
    </svg>
    <span class="seconds" id="seconds"></span>
`;
let dr = $('#mydiv').data('duration');
countdownContainer.style.position = "relative";

const span = document.querySelector(".seconds");

span.style.position = "absolute";
span.style.color = "rgb(3 69 62)";
span.style.fontWeight = "900";
span.style.top = "50%";
span.style.left = "50%";
span.style.transform = "translate(-50%, -50%)";

const progressWrapper = document.getElementById("progress-wrapper"),
  progress = document.getElementById("progress"),
  timeSpan = document.getElementById("seconds");

//  Countdown functions

const options = {
  transition: countdownContainer.dataset.transition,
  color: countdownContainer.dataset.color,
  size: +countdownContainer.dataset.size,
  initialPosition: countdownContainer.dataset.position,
};

const circularCountdown = ({
  transition,
  color,
  size,
  initialPosition,
},dr) => {
  // Rendering countdown on HTML
  renderSeconds(dr);
  // Adjusting timer font-size depending of countdown size
  adjustFontSize(size);
  // Adjusting circular countdown size
  adjustCircleSize(size);
  // Setting initial position of countdown
  setInitialPosition(initialPosition);
  // Starting animation (setting transition, color and duration)
  animationStart(color, transition, dr);
};

const renderSeconds = (dr) => {
  timeSpan.innerHTML = dr;
  const secondsCountdown = setInterval(() => {
    dr--;
    timeSpan.innerHTML = dr;
    if (dr === 0) {
      clearInterval(secondsCountdown);
      timeSpan.innerHTML = `<i class="fa-solid fa-check"></i>`;
        window.location.href = window.location.href;
    }
  }, 1000);
};

const adjustFontSize = (size) => {
  timeSpan.style.fontSize = `${size / 4}px`;
};

const adjustCircleSize = (size) => {
  progressWrapper.style.width = size;
  progressWrapper.style.height = size;
};

const setInitialPosition = (initialPosition) => {
  if (initialPosition === "up") {
    progressWrapper.style.transform = "rotate(270deg)";
  } else if (initialPosition === "left") {
    progressWrapper.style.transform = "rotate(180deg)";
  } else if (initialPosition === "down") {
    progressWrapper.style.transform = "rotate(90deg)";
  }
};

const animationStart = (color, transition, dr) => {
  let length = progress.getTotalLength();
  progress.style.stroke = color;
  progressWrapper.style.strokeDasharray = length;
  progressWrapper.style.animation = `progress ${transition} ${dr}s forwards`;
};

const initCountdown = () => {

  circularCountdown(options,$('#mydiv').data('duration'));
};


