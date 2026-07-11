function WeatherCard({ icon, title, value, unit }) {
    return (
        <div className='flex border border-white/20 shadow-2xl backdrop-blur-2xl gap-1 justify-center items-center cursor-pointer hover:scale-102 hover:bg-gray-700 transition-all duration-200 rounded-3xl p-4'>
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