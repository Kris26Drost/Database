import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import Title from '../../components/Title'

//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData'


const Weather1 = () => {

    // request-hook
    const { error, loading, data, getData } = useGetData()

    // state til ...
    const [zip, setZip] = useState("8000")

    useEffect(() => {

        // overvej regex - regular expression
        if (zip.length === 4 && !isNaN(zip)) {
            getData('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',dk&units=metric&lang=da&appid=' + process.env.REACT_APP_WEATHERAPIKEY)
        }
    }, [zip])


    return (
        <div className='Weather1 container'>

            <Title headline='Vejret - indtast postnummer' />

            { error && <Error /> }

            { loading && <Loader /> }

            <div className='row'>
                <div className='col-12 mb-5 text-center'>
                    <input type='text' placeholder='Indtast et postnummer' onInput={ (e) => setZip(e.target.value) } defaultValue={ zip } />
                </div>
            </div>

            <div className='col-12 col-md-6 offset-md-3'>

                {
                    data && <article className='card'>
                        <div className='card-body'>
                            <div className='card-title'>
                                <h2>Vejret i { data.name }</h2>
                            </div></div>
                        <div className='card-body'>
                            <p className='cap-first desplay-4'>{ data.weather[0].description }</p>
                            <p>Temperatur { Math.round(data.main.temp) }&#8451;</p>
                            <p>Luftfugtighed { data.main.humidity }%</p>
                            <img src={ 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png' } />
                        </div>
                    </article>
                }
            </div>
        </div>
    )
}

export default Weather1