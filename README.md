# Weather App

Type a city name, press Search, and the page shows the current weather for that city. The result looks like a postcard.

## Where the weather comes from

The weather data comes from [weatherapi.com](https://www.weatherapi.com/).

## Where it lives

The app is hosted on [Vercel](https://vercel.com/).

## How it works

1. You type a city and press Search.
2. The page asks a small function on Vercel for that city's weather.
3. The function asks weatherapi.com and sends back only the details the page needs.

The page never talks to weatherapi.com directly.

## The API key

The key for weatherapi.com is a secret. It is stored in Vercel as an environment variable (a private setting kept outside the code) called `WEATHER_API_KEY`. It is never written in the code or in this repository.

## What is in the folder

- `index.html`, `style.css`, `script.js`, `greetings.js`: the page you see.
- `api/weather.js`: the small function that looks up the weather.
- `mockups/`: design ideas from earlier. They are not part of the app.
