import {COUNT_DAY, useWeather} from "./useWeather";
import React from "react";
import {WeatherDay} from "./types";
import {WeatherCurrentDay, WeatherDayList, WeatherDayDetails} from "./components";


export const Weather = () => {
    const {
        city,
        handleChangeCity,
        handleClickGetWeatherList,
        weatherListState,
        selectIndexDay,
        handleClickOnDay,
        validCity
    } = useWeather()

    return (
        <>
            <div className={'search'} style={{margin: '20px 0'}}>
                <input value={city}  placeholder={'Paris'} onChange={handleChangeCity} name={'city'}/>
                <button disabled={!validCity} onClick={handleClickGetWeatherList}>get weather</button>
            </div>
            {weatherListState.error && <div>error: {JSON.stringify(weatherListState.error)}</div>}
            {weatherListState.data && (
                <>
                    <div className={'name'}>
                        {weatherListState.data.current.name}
                    </div>

                    <div className={'container'}>

                        <div className={'currentDay'}>
                            <WeatherCurrentDay day={weatherListState.data.current}/>
                        </div>
                        <div className={'list'}>
                            <div style={{marginBottom: '20px', fontSize: 20, fontWeight: 500}}>Next {COUNT_DAY} days</div>
                            {weatherListState.data.forecastDay.map((item: WeatherDay, i) => {
                                return (
                                    <WeatherDayList day={item} key={item.date} i={i} handleClickOnDay={handleClickOnDay}/>
                                )
                            })}
                        </div>
                        <div className={'weatherDetail'}>
                            {selectIndexDay && <WeatherDayDetails day={weatherListState.data.forecastDay[selectIndexDay - 1]}/>}
                        </div>
                        {weatherListState.isFetching && <div className={'loader'}>loading...</div>}
                    </div>
                </>
            )}
        </>
    )
}