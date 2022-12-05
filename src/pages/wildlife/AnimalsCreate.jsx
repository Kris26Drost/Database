import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { usePostData } from '../../hooks/usePostData'

const AnimalsCreate = () => {

    // hook til post/opret data
    const { error, loading, data, postData } = usePostData()

    // state til at rumme ny todo (fra inputfelt)
    const [newanimal, setNewanimal] = useState() //skal være "" hvis controlled


    // Tøm inputfelt efter post
    useEffect(() => {
        if (data) setNewanimal() // hvis controlled component - husk at state så skal være "" og ikke bare tom/undefined
        document.querySelector("form").reset()
    }, [data])



    // Send data til api 
    const handleSubmit = (e) => {
        e.preventDefault()  //VIGTIG ved submit af form

        let ny = {
            "fields": {
                "Animal": newanimal
            }
        }

        // send til hook som sender til API
        postData('https://api.airtable.com/v0/appEt2FPO3ormMpjQ/Wildlife', ny,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
                "Content-Type": "application/json"
            }
        )
    }

    return (
        <div className='Animalcreate container'>
            <Title headline='Opret ny Todo' />

            {/* ERROR */ }
            { error && <Error /> }

            {/* LOADING */ }
            { loading && <Loader /> }

            { data && <h2>Ny animal er opretter med id: { data.id } </h2> }



            <div className='row'>
                <div className='col'>

                    <form onSubmit={ handleSubmit }>

                        <label className='form-label me-3'>Indtast animal:
                            <input type='text' onInput={ e => setNewanimal(e.target.value) } className='form-control ' />
                        </label>

                        <button type='submit' className='btn btn-primary'>Opret ny animal</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AnimalsCreate