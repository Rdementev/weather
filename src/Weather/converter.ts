import {Weather, WeatherDto} from "./types";

export const converterWeatherList  = (data: WeatherDto): Weather => {
    return <Weather>{
        current: {
            name: data.location.name,
            temp_c: data?.current.temp_c,
            icon: data.current.condition.icon,
            wind_kph: data.current.wind_kph,
            humidity: data.current.humidity
        },
        forecastDay: data.forecast.forecastday.map((item) => {
            return {
                date: item.date,
                maxTempC: item.day.maxtemp_c,
                minTempC: item.day.mintemp_c,
                icon: item.day.condition.icon,
                wind_kph: item.day.maxwind_kph,
                humidity: item.day.avghumidity,
                sunrise: item.astro.sunrise,
                sunset: item.astro.sunset,
                uv: item.day.uv,
                chanceRain: item.day.daily_chance_of_rain,
                chanceSnow: item.day.daily_chance_of_snow,
            }
        })
    }
}