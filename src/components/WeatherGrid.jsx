import WeatherCard from "./WeatherCard"

function WeatherGrid({ weatherData }) {
    const cards = [
        {
            icon: "💧",
            title: "Humidity :",
            value: weatherData.current.relative_humidity_2m,
            unit: weatherData.current_units.relative_humidity_2m
        },
        {
            icon: "🌧️",
            title: "Precipitation :",
            value: weatherData.current.precipitation,
            unit: weatherData.current_units.precipitation
        },
        {
            icon: "☀️",
            title: "UV Index :",
            value: weatherData.daily.uv_index_max[0],
            unit: ""
        },
        {
            icon: "🔺",
            title: "Max Temperature :",
            value: weatherData.daily.temperature_2m_max[0],
            unit: weatherData.daily_units.temperature_2m_max
        },
        {
            icon: "🔻",
            title: "Min Temperature :",
            value: weatherData.daily.temperature_2m_min[0],
            unit: weatherData.daily_units.temperature_2m_min
        },
        {
            icon: "🌅",
            title: "Sunrise :",
            value: weatherData.daily.sunrise[0],
            unit: ""
        },
        {
            icon: "🌇",
            title: "Sunset :",
            value: weatherData.daily.sunset[0],
            unit: ""
        }
    ]
    return (
        <div className='w-5/6 grid grid-cols-3 blur-4px starting:opacity-0 transition-all duration-500  bg-gray-400 rounded-4xl p-4 gap-8'>
            {cards.map((card) => (
                <WeatherCard
                    key={card.title}
                    icon={card.icon}
                    title={card.title}
                    value={card.value}
                    unit={card.unit}
                />
            ))}
        </div>
    )
}

export default WeatherGrid