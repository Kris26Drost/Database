import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { useGetData } from '../../hooks/useGetData'
import { usePatchData } from '../../hooks/usePatchData'
import { useParams, useNavigate } from 'react-router-dom'

const AnimalsEdit = () => {

    const { id } = useParams() //snup id fra url (tjek i App.jsx - hvor "id" er navngivet/sat)
    const navigate = useNavigate() // så brugeren kan redirectes retur til adminsiden efter rettelse

    const { error, loading, data, getData } = useGetData() //custom hook med GET-metode
    const { error: errorPatch, loading: loadingPatch, data: dataPatch, patchData } = usePatchData()

    // state til at rumme den rettede animal
    const [updatedAnimal, setUpdatedAnimal] = useState()

    // 1) Hent den todo der skal rettes (når component loader)
    useEffect(() => {

        getData('https://api.airtable.com/v0/appEt2FPO3ormMpjQ/Wildlife/' + id,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
                "Content-Type": "application/json"
            }

        )
    }, [])

    // 3) Lyt efter rettelser - og redirect til adminsiden når...
    useEffect(() => {

        //  hvis der er data fra patch-requestet = færdig med at rette
        if (dataPatch) {
            navigate('/adminanimal')
        }


    }, [dataPatch])



    // 2) Send data til api 
    const handleSubmit = (e) => {
        e.preventDefault()  //VIGTIG ved submit af form

        let t = {
            "fields": {
                "Animal": updatedAnimal
            }
        }

        // send til hook som sender til API
        patchData('https://api.airtable.com/v0/appEt2FPO3ormMpjQ/Wildlife/' + id, t,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
                "Content-Type": "application/json"
            }
        )
    }


    return (
        <div className='container'>

            <Title headline='Ret uvalgt todo' />

            { (loading || loadingPatch) && <Loader /> }
            { (error || errorPatch) && <Error /> }

            <div className='row'>
                <div className='col'>

                    { data &&

                        <form onSubmit={ handleSubmit }>

                            <label className='form-label me-3'>Ret animal:
                                <input type='text' defaultValue={ data.fields.Animal } onInput={ e => setUpdatedAnimal(e.target.value) } className='form-control ' />
                            </label>

                            <button type='submit' className='btn btn-primary'>Ret animal</button>
                        </form>
                    }

                </div>
            </div>
        </div >
    )
}

export default AnimalsEdit