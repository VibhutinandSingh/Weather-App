import { useState } from 'react'

function App() {

  const [cityName, setCityName] = useState("")
  const [data, setData] = useState(null)
  

  async function searchData(e) {
    e.preventDefault() // prevents the page from reloading

    const responseCordinates = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
    )
    const data = await responseCordinates.json()
    fetchWeatherData(data)
  }

  async function fetchWeatherData(data) {
    const responseWeatherData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current=temperature_2m,relative_humidity_2m,precipitation,rain,is_day&timezone=Asia%2FKolkata`
    )
    const weatherData = await responseWeatherData.json()
    console.log(weatherData)
    setData(weatherData)
  }

  return (
    <div>
      <div className='w-3/4 h-3/4 bg-gray-700 mt-5 m-auto  rounded-4xl flex flex-col text-white justify-center items-center p-4 '>
        <form
          onSubmit={searchData}>
          <input
            type="text"
            placeholder='Enter city name'
            value={cityName}
            onChange={(e) => { setCityName(e.target.value) }}
            className='bg-gray-300 p-4 text-black outline-none rounded-l-3xl' />
          <button
            className='bg-sky-800 rounded-r-4xl p-4 text-white'
            type='submit'
          >Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
