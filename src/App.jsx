import { useEffect, useRef, useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherGrid from './components/WeatherGrid'

function App() {

  const [cityName, setCityName] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const selectInput = useRef(null)

  function focusInputField() {
    selectInput.current?.focus()
  }

  useEffect(() => {
    focusInputField()
    setCityName(localStorage.getItem("previousCityName") || "")
  }, [])

  async function searchData(e) {
    e.preventDefault() // prevents the page from reloading
    setWeatherData(null)
    setError("")
    setLoading(true)

    try {
      const responseCoordinates = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName.trim()}&count=1&language=en&format=json`
      )
      const coordinateData = await responseCoordinates.json()
      if (!coordinateData.results) {
        setWeatherData(null)
        setError("Sorry! We couldn't find that city")
        return
      }
      console.log(coordinateData)
      await fetchWeatherData(coordinateData.results[0])
    }
    catch (error) {
      console.error(error)
      setWeatherData(null)
      setError("Network error. Please try again")
    }
    finally {
      setLoading(false)
    }
  }

  async function fetchWeatherData(selectedCity) {
    try {
      const responseWeatherData = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current=temperature_2m,relative_humidity_2m,precipitation,rain,is_day&timezone=Asia%2FKolkata`
      )
      if (!responseWeatherData.ok) {
        setWeatherData(null)
        setError("Server error")
        return
      }
      const weatherDataFromApi = await responseWeatherData.json()
      console.log(weatherDataFromApi)
      const data = {
        ...weatherDataFromApi,  // merging two separate objects to for a single object having property of both
        selectedCity
      }
      setWeatherData(data)
      localStorage.setItem("previousCityName", cityName)

    }
    catch (error) {
      console.error(error)
      setWeatherData(null)
      setError("Network error")
    }
  }

  return (
    <div className='h-screen bg-linear-to-br from-slate-950 p-20 via-slate-800 to-blue-950'>
      <div className='w-3/4 gap-4 bg-gray-700 m-auto rounded-4xl flex flex-col text-white justify-center items-center p-4 '>
        <h1 className='text-4xl font-bold'>
          🌤️ Weather Dashboard
        </h1>
        <SearchBar
          cityName={cityName}
          setCityName={setCityName}
          loading={loading}
          searchData={searchData}
          selectInput={selectInput}
          weatherData={weatherData}
        />
        <div className='flex  justify-center items-center gap-3 rounded-3xl'>
          {weatherData ? <h1 className='text-xl  starting:opacity-0 transition-all duration-500 rounded-3xl'>📍 {weatherData.selectedCity.name} </h1> : ""}
          {weatherData ? <h1 className='text-xl flex  starting:opacity-0 transition-all duration-500 rounded-3xl'>
            ☀️ {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}</h1> : ""}
        </div>
        <p className='text-2xl'>{error}</p>
        {weatherData && (
          <WeatherGrid
            weatherData={weatherData}
          />
        )}
      </div>
    </div>
  )
}

export default App
