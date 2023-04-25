import React from 'react'
import { WeatherDay } from '../types'

type props = {
    day : WeatherDay
    i: number
    handleClickOnDay: (index: number) => void
}
export const WeatherDayList: React.FC<props> = ({day, i, handleClickOnDay}): JSX.Element => {
    return (
        <div style={{marginBottom: '20px', cursor: 'pointer'}} onClick={() => handleClickOnDay(i+ 1)}>
            <div>date: {day.date}</div>
            <div>temp max: {day.maxTempC}</div>
            <div>temp min: {day.minTempC}</div>
            <div>humidity: {day.humidity}</div>
            <img src={day.icon} alt={day.icon}/>
        </div>
    )
}