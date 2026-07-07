import Search from "./components/Search";
import { Weather } from "../types/weather";

interface PageProps {
    searchParams: Promise<{ city?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
    const { city } = await searchParams;
    let weather: Weather | null = null;
    let error: string | null = null;

    if (city) {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            error = "City not found. Please try again.";
        } else {
            weather = await res.json();
        }
    }

    return (
        <main>
            <h1>Weather <span>Finder</span></h1>
            <Search />

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-card">
                    <div className="weather-header">
                        <h2>{weather.name}, {weather.sys.country}</h2>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                    </div>

                    <p className="temperature">{Math.round(weather.main.temp)}°C</p>
                    <p className="description">{weather.weather[0].description}</p>

                    <div className="weather-stats">
                        <div className="stat">
                            <span className="stat-value">{Math.round(weather.main.feels_like)}°C</span>
                            <span className="stat-label">Feels Like</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{weather.main.humidity}%</span>
                            <span className="stat-label">Humidity</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{weather.wind.speed} m/s</span>
                            <span className="stat-label">Wind</span>
                        </div>
                    </div>
                </div>
            )}

            {!city && !weather && (
                <div className="empty">
                    <p>🌍 Enter a city name to get the weather</p>
                </div>
            )}
        </main>
    );
}