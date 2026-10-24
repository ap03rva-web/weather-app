const NOT_FOUND = "We couldn't find that city. Please check the spelling and try again.";
const UNAVAILABLE = "The weather service is unavailable right now. Please try again later.";

module.exports = async function handler(req, res) {
  const city = String(req.query.city || "").trim();

  if (!city) {
    return res.status(400).json({ error: NOT_FOUND });
  }

  try {
    const url =
      "https://api.weatherapi.com/v1/current.json" +
      "?key=" + encodeURIComponent(process.env.WEATHER_API_KEY || "") +
      "&q=" + encodeURIComponent(city);

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("weatherapi.com error code:", data.error.code);
      if (data.error.code === 1006) {
        return res.status(404).json({ error: NOT_FOUND });
      }
      return res.status(502).json({ error: UNAVAILABLE });
    }

    const icon = data.current.condition.icon;

    return res.status(200).json({
      city: data.location.name,
      country: data.location.country,
      localTime: data.location.localtime,
      description: data.current.condition.text,
      icon: icon.startsWith("//") ? "https:" + icon : icon,
      temperatureC: data.current.temp_c,
      feelsLikeC: data.current.feelslike_c,
      humidity: data.current.humidity,
      windKph: data.current.wind_kph,
      windDirection: data.current.wind_dir,
    });
  } catch (err) {
    console.error("weather lookup failed");
    return res.status(502).json({ error: UNAVAILABLE });
  }
};
