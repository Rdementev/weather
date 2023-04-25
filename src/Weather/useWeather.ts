import React, {useCallback, useState} from "react";
import {Weather} from "./types";
import {converterWeatherList} from "./converter";

const API_KEY = '4af7d5ea77da4d4ab7731034232104'
export const COUNT_DAY = 5

export interface RequestState {
    isFetching: boolean;
    isFetched: boolean;
    fetchedTime: null | number;
}

export interface ResponseApiError<T = any> {
    code?: string;
    status?: number;
    message: string;
    data: T;
}

export interface MergeRequestState<D, E> extends RequestState {
    data: null | D;
    error: null | E;
}

export const getFetchingRequestState = (): Pick<RequestState, 'isFetching'> => ({
    isFetching: true,
});

export const getInitialRequestState = (): RequestState => ({
    isFetching: false,
    isFetched: false,
    fetchedTime: null,
});

export const getFetchedRequestState = (): RequestState => ({
    isFetching: false,
    isFetched: true,
    fetchedTime: Date.now(),
});

export interface WeatherListState extends MergeRequestState<Weather, ResponseApiError> {
}


const initialStateWeatherList: WeatherListState = {
    ...getInitialRequestState(),
    error: null,
    data: null,
};


export const useWeather = () => {
    const [weatherListState, setWeatherListState] = useState<WeatherListState>(initialStateWeatherList)
    const [city, setCity] = useState<string>('')
    const [validCity, setValidCity] = useState<boolean>(false)
    const [selectIndexDay, setSelectIndexDay] = useState<number | null>(null)

    const handleChangeCity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
        if (e.target.value.length > 0) return setValidCity(true)
        setValidCity(false)
    }, [setCity])

    const handleClickGetWeatherList = () => {
        setWeatherListState({...weatherListState, isFetching: true})
        const headers = {'Content-Type': 'application/json'}
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${COUNT_DAY}`, {headers})
            .then(async (res) => {
                const response = await res.json()
                let data: WeatherListState
                if (res.status === 200) {
                    data = {
                        ...Object.assign(weatherListState, getFetchedRequestState()),
                        data: converterWeatherList(response) ?? null,
                        error: null,
                    }
                    setCity('')
                    setValidCity(false)
                } else {
                    data = {
                        ...Object.assign(weatherListState, getFetchedRequestState()),
                        data: null,
                        error: response.error
                    }
                }
                setWeatherListState(data)

            })
            .catch(e => {
                throw new Error(e)
            })
    }

    const handleClickOnDay = (i: number) => {
        setSelectIndexDay(i)
    }

    return {
        weatherListState,
        city,
        handleChangeCity,
        handleClickGetWeatherList,
        selectIndexDay,
        handleClickOnDay,
        validCity,
    }
}