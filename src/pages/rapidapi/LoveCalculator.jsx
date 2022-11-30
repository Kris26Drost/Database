import React, {useState} from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { useGetData } from '../../hooks/useGetData'

const LoveCalculator = () => {

    const { error, loading, data, getData } = useGetData()

    // State til 2 navne
    const [fname, setFname] = useState()
    const [sname, setSname] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

        getData('https://love-calculator.p.rapidapi.com/getPercentage',
            {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
                'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
            },
            { fname: fname, sname: sname }
        )
    }


    return (
        <div className='LoveCalculator container'>

            <Title headline='Test succes-raten inden du dater!' />
            <p>...eller skift navn! :P</p>

            {loading && <Loader />}
            {error && <Error errormessage='Ingen data - øv' />}

            <div className='row mt-5'>
                {data && <article className='card'>
                    <div className='card-body'>
                        <div className='card-title text-center'>
                            <h2 className='display-2'>{data.percentage}</h2>
                            <h4>{data.result}</h4>
                        </div>
                    </div>
                </article>
                }
            </div>

            

        </div>
    )
}

export default LoveCalculator