import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { useState, useEffect } from 'react'

import { useGetData } from '../../hooks/useGetData'


const Jokes = () => {

    const { error, loading, data, getData } = useGetData()

    // const [joke, setJoke] = useState()

    useEffect(() => {
        randomJoke()
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        randomJoke()
    }

    const randomJoke = () => {
        // getData('https://v2.jokeapi.dev/joke/Any?safe-mode', '&lang=' + lang + '&amount=' + amount + '&idRange=' + id )
    
        getData('https://v2.jokeapi.dev/joke/programming,misc,pun?safe-mode,&lang=en&amount=1')
    }

    return (
        <div className='Jokes container'>

            <Title headline='Random Jokes! (some can be a bit controversial)' />

            { loading && <Loader /> }
            { error && <Error errormessage='Øv ingen jokes - ;(' /> }

            { data && 
            <div className='card'>
                <div className='card-body'>
                    <div className='card-title text-center'>

                        <h4 className='display-4'>
                            { data.setup }
                        </h4>
                        <h5 className='display-5'>
                            { data.delivery }
                        </h5>
                    </div>
                </div>
            </div>
            
            }

            <button onClick={ handleClick } className='btn btn-success mt-5'> Get a random joke! </button>

        </div>
    )
}

export default Jokes