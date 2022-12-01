import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import Title from '../../components/Title'
import './Weather.scss'

//import map
import { initMap, changeMapView, removeMap } from '../../helpers/leaflet'

//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData'

const Weather3 = () => {

    // request-hook
    const { error, loading, data, getData } = useGetData()
    // request-hook DAWA
    const { error: errorDAWA, loading: loadingDAWA, data: dataDAWA, getData: getDataDAWA } = useGetData()

    // state til
    const [zip, setZip] = useState("8000")

    useEffect(() => {

        // overvej regex - regular expression
        if (zip.length === 4 && !isNaN(zip)) {
            getData('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',dk&units=metric&lang=da&appid=' + process.env.REACT_APP_WEATHERAPIKEY)
        } 
        // else {
            // søg i DAWA og send brugerens input med (state)
            getDataDAWA("https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip)
        // }
    }, [zip])


    useEffect(() => {
    
        // hvis der er data (og dermed koordinater til at valgt postnummer) flt kort-view til postnr-koordinater
        // if(data) changeMapView([data.coord.lat, data.coord.lon], data.weather[0].description)
        if(data && dataDAWA) changeMapView([dataDAWA[0].postnummer.visueltcenter_y, dataDAWA[0].postnummer.visueltcenter_x], data.weather[0].description)                  

    }, [data]) //lytter efter data fra openweather (med koortdinater!)
    

    // init map
    useEffect(() => {

        initMap([56, 10])


        return () => {
            removeMap() //fjern jortet når component unmountes
        }
    }, [])


    return (
        <div className='Weather3 container'>

            <Title headline='Vejret - adresseopslag hos DAWA' />

            { error && <Error /> }

            { loading && <Loader /> }

            <div className='row'>
                <div className='col-12 mb-5 text-center'>

                    {/* Input postnummer by */ }
                    <input list='adresseforslag'
                        type='text'
                        placeholder='Indtast et postnummer'
                        autoComplete='off'
                        
                        onInput={ (e) => setZip(e.target.value) }
                        defaultValue={ zip }
                    />

                    {/* Datalist til input */ }
                    <div>
                        <ul>
                            {
                                dataDAWA && dataDAWA.map(a => <li onClick={ (e) => setZip(e.target.value.substring(0, 4)) } key={ a.postnummer.nr }>{ a.tekst }  </li>)
                            }
                        </ul>
                    </div>
                </div>

                {/* KORT */ }
                <div id='mapcontainer' className='col-12 col-md-6 offset-md-3' style={ { width: '300px', height: '300px', backgroundColor: 'cornflowerblue' } }>
                    Kortet er på vej...
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
                                <img src={ 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png' } alt='forecast'/>
                            </div>

                        </article>
                    }

                </div>
            </div>
        </div>
    )
}

export default Weather3