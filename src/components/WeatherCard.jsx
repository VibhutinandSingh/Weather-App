function WeatherCard({ icon, title, value, unit }) {
    return (
        <div className='flex bg-gray-500 gap-1 justify-center blur-5px items-center shadow-2xl  cursor-pointer hover:bg-gray-600 rounded-3xl p-4'>
            <h2>
                {icon}
                {title}
            </h2>
            {value}
            {unit}
        </div>
    )
}
export default WeatherCard