const form = document.getElementById("search-form");
const cityInput = document.getElementById("city");
const problem = document.getElementById("problem");
const welcome = document.getElementById("welcome");
const result = document.getElementById("result");
const stampEmoji = document.getElementById("stamp-emoji");
const stampIcon = document.getElementById("stamp-icon");

function showProblem(message) {
  problem.textContent = message;
  problem.hidden = false;
}

// "2026-10-24 9:05" -> "09:05, 24-10-2026"
function formatLocalTime(localTime) {
  const [date, time] = localTime.split(" ");
  const [year, month, day] = date.split("-");
  return time.padStart(5, "0") + ", " + day.padStart(2, "0") + "-" + month.padStart(2, "0") + "-" + year;
}

function showResult(weather) {
  document.getElementById("greeting").textContent = greetingFor(weather.country) + " from";
  document.getElementById("place").textContent = weather.city + ", " + weather.country;
  document.getElementById("local-time").textContent = "Local time " + formatLocalTime(weather.localTime);
  document.getElementById("temperature").textContent = Math.round(weather.temperatureC) + "°C";
  document.getElementById("description").textContent = weather.description;
  document.getElementById("feels-like").textContent = "Feels like " + Math.round(weather.feelsLikeC) + "°C";
  document.getElementById("humidity").textContent = weather.humidity + "%";
  document.getElementById("wind").textContent = Math.round(weather.windKph) + " km/h " + weather.windDirection;

  stampIcon.src = weather.icon;
  stampIcon.hidden = false;
  stampEmoji.hidden = true;

  welcome.hidden = true;
  result.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  problem.hidden = true;

  try {
    const response = await fetch("/api/weather?city=" + encodeURIComponent(cityInput.value.trim()));
    const data = await response.json();

    if (!response.ok) {
      showProblem(data.error);
      return;
    }

    showResult(data);
  } catch (error) {
    showProblem("The weather service is unavailable right now. Please try again later.");
  }
});
