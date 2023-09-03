function controlminSlider(minSlider, maxSlider, minSliderTooltip) {
  const [min, max] = getParsed(minSlider, maxSlider);
  if (min > max - 100) {
    minSlider.value = max - 100;
  } else {
    fillSlider(minSlider, maxSlider, "#dfe5e8", "#fc6054", maxSlider);
    minSliderTooltip.style.left = `calc(${min * 0.1}% - (${
      5 + min * 0.025
    }px))`;
    minSliderTooltip.innerHTML = min;
    minSlider.value = min;
  }
}

function controlmaxSlider(minSlider, maxSlider, maxSliderTooltip) {
  const [min, max] = getParsed(minSlider, maxSlider);
  if (min + 100 <= max) {
    fillSlider(minSlider, maxSlider, "#dfe5e8", "#fc6054", maxSlider);
    setToggleAccessible(maxSlider);
    maxSliderTooltip.style.left = `calc(${max * 0.1}% - (${
      8 + max * 0.025
    }px))`;
    maxSliderTooltip.innerHTML = max;
    maxSlider.value = max;
  } else {
    maxSlider.value = min + 100;
  }
}

function getParsed(currentMin, currentMax) {
  const min = parseInt(currentMin.value, 10);
  const max = parseInt(currentMax.value, 10);
  return [min, max];
}

function fillSlider(min, max, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = max.max - min.min;
  const minPosition = min.value - max.min;
  const maxPosition = max.value - max.min;
  controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(minPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(minPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(maxPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(maxPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const maxSlider = document.querySelector("#event-size-max-slider");
  if (Number(currentTarget.value) <= 0) {
    maxSlider.style.zIndex = 2;
  } else {
    maxSlider.style.zIndex = 0;
  }
}

const minSlider = document.querySelector("#event-size-min-slider");
const maxSlider = document.querySelector("#event-size-max-slider");
const sliderLength = document
  .querySelector("#event-size-max-slider")
  .getBoundingClientRect().width;
const minSliderTooltip = document.querySelector(
  "#event-size-min-slider-tooltip"
);
const maxSliderTooltip = document.querySelector(
  "#event-size-max-slider-tooltip"
);

fillSlider(minSlider, maxSlider, "#dfe5e8", "#fc6054", maxSlider);
setToggleAccessible(maxSlider);

minSlider.oninput = () =>
  controlminSlider(minSlider, maxSlider, minSliderTooltip);
maxSlider.oninput = () =>
  controlmaxSlider(minSlider, maxSlider, maxSliderTooltip);
