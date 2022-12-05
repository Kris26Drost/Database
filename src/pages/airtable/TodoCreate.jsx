import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { usePostData } from '../../hooks/usePostData'

const TodoCreate = () => {

    // hook til post/opret data
    const { error, loading, data, postData } = usePostData()

    // state til at rumme ny todo (fra inputfelt)
    const [newtodo, setNewtodo] = useState() //skal være "" hvis controlled


    // Tøm inputfelt efter post
    useEffect(() => {
        if (data) setNewtodo() // hvis controlled component - husk at state så skal være "" og ikke bare tom/undefined
        document.querySelector("form").reset()
    }, [data])



    // Send data til api 
    const handleSubmit = (e) => {
        e.preventDefault()  //VIGTIG ved submit af form

        let ny = {
            "fields": {
                "Todos": newtodo
            }
        }

        // send til hook som sender til API
        postData('https://api.airtable.com/v0/appYosUeFMUaF80ZU/Todobase', ny,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
                "Content-Type": "application/json"
            }
        )
    }

    return (
        <div className='Todocreate container'>
            <Title headline='Opret ny Todo' />

            {/* ERROR */ }
            { error && <Error /> }

            {/* LOADING */ }
            { loading && <Loader /> }

            { data && <h2>Ny todo er opretter med id: { data.id } </h2> }



            <div className='row'>
                <div className='col'>

                    <form onSubmit={ handleSubmit }>

                        <label className='form-label me-3'>Indtast todo:
                            <input type='text' onInput={ e => setNewtodo(e.target.value) } className='form-control ' />
                        </label>

                        <button type='submit' className='btn btn-primary'>Opret ny todo</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default TodoCreate