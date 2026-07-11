function SearchBar({ cityName, setCityName, searchData, selectInput, loading}) {
    return (
        <form
            onSubmit={searchData}
            className='flex flex-col  justify-center bg-white/10 relative backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl items-center gap-4 p-4'>
            <h2>
                {loading ? <div>Searching for {cityName}</div> : <p>Search for any city</p>}
            </h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-center  lg:flex-row gap-3 lg:gap-0 md:gap-0 ">
                    <div className="flex">

                        <div className="bg-gray-300 p-4 cursor-default rounded-l-3xl flex justify-center items-center">
                            🔍
                        </div>
                        <input
                            type="text"
                            placeholder=' Search City...'
                            value={cityName}
                            ref={selectInput}
                            disabled={loading}
                            onChange={(e) => { setCityName(e.target.value) }}
                            className='bg-gray-300 w-4/5 border border-white/20 p-4 rounded-r-4xl lg:rounded-r-none md:rounded-r-none text-black outline-none' />
                    </div>

                    <button
                        className='bg-sky-600 border border-white/20 shadow-2xl backdrop-blur-2xl w-50 transition-all   cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-sky-700 rounded-4xl md:rounded-r-4xl md:rounded-l-none p-4 text-white'
                        type='submit'
                        disabled={!cityName.trim() || loading}
                        title={!cityName.trim() ? "Enter city first" : "Search"}
                    >{loading ? <div className='flex justify-center  items-center gap-2'>
                        <div className='w-5 h-5 rounded-full border-2  border-gray-300 border-t-blue-500 animate-spin'></div>
                        <h2>Searching...</h2>
                    </div> : "Search"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchBar