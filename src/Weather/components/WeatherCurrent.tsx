import React from 'react'
import { WeatherCurrent } from '../types'

type props = {
    day : WeatherCurrent
}
export const WeatherCurrentDay: React.FC<props> = ({day}): JSX.Element => {
    return (
        <div>
            <div style={{marginBottom: '20px', fontSize: 20, fontWeight: 500}}>Current day</div>
            <div>temp: {day.temp_c}</div>
            <div>wind_kph: {day.wind_kph}</div>
            <div>humidity: {day.humidity}</div>
            <img src={day.icon} alt={day.icon}/>
        </div>
    )
}