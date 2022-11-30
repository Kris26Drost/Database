import React from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

// import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData'

const Pokemon = () => {

    const { error, loading, data, getData } = useGetData()

    // ved klik på fx knap
    const handleClick = () => {
        getData('https://pokedex2.p.rapidapi.com/pokedex/uk/pikachu',
            {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
                'X-RapidAPI-Host': 'pokedex2.p.rapidapi.com',
            }
        )
    }

  return (
    <div className='container'>
            <Title headline='Vælg din Pokémon' />

            {loading && <Loader />}
            {error && <Error />}

            {data && <div className='card'>
                <div className='card-body'>
                    <div className='card-title text-center'>

                        <h2 className='display-2'>
                            <a href={data.link} target='_blank'>{data.name}</a>
                        </h2>
                    </div>
                </div>
            </div>
            }

            <button onClick={handleClick} className='btn btn-success mt-5'>Jeg vælger dig!</button>
        </div>

  )
}

export default Pokemon