import React from 'react'
import {WeatherDay} from '../types'

type props = {
    day : WeatherDay
}
export const WeatherDayDetails: React.FC<props> = ({day}): JSX.Element => {
    return (
        <div>
            <div style={{marginBottom: '20px', fontSize: 20, fontWeight: 500}}>Detail day</div>
            <div>date: {day.date}</div>
            <div>temp max: {day.maxTempC}</div>
            <div>temp min: {day.minTempC}</div>
            <div>humidity: {day.humidity}</div>
            <div>uv: {day.uv}</div>
            <div>sunset: {day.sunset}</div>
            <div>sunrise: {day.sunrise}</div>
            <img src={day.icon} alt={day.icon}/>
        </div>
    )
}