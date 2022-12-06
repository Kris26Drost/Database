import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { useGetData } from '../../hooks/useGetData'
import { usePatchData } from '../../hooks/usePatchData'
import { useParams, useNavigate } from 'react-router-dom'

const TodoEdit = () => {

    const { id } = useParams() //snup id fra url (tjek i App.jsx - hvor "id" er navngivet/sat)
    const navigate = useNavigate() // så brugeren kan redirectes retur til adminsiden efter rettelse

    const { error, loading, data, getData } = useGetData() //hent todo der skal rettes
    const { error: errorCategories, loading: loadingCategories, data: dataCategories, getData: getDataCategories } = useGetData() // hete kategorier
    const { error: errorPatch, loading: loadingPatch, data: dataPatch, patchData } = usePatchData()

    // state til at rumme den rettede todo - todo og kategori
    const [updatedTodo, setUpdatedTodo] = useState()
    const [updatedCategory, setUpdatedCategory] = useState()

    // 1) Hent den todo der skal rettes (når component loader)
    useEffect(() => {

        // Kategorier så man evt. kan vælge en adnen kategori
        getDataCategories('https://api.airtable.com/v0/appYosUeFMUaF80ZU/Category',
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY }
        )

        // Todoen der skal rettes
        getData('https://api.airtable.com/v0/appYosUeFMUaF80ZU/Todobase/' + id,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
                "Content-Type": "application/json"
            })
    }, [])


    // 3) Lyt efter rettelser - og redirect til adminsiden når...
    useEffect(() => {

        //  hvis der er data fra patch-requestet = færdig med at rette
        if (dataPatch) {
            navigate('/admintodo')
        }

    }, [dataPatch])



    // 2) Send data til api 
    const handleSubmit = (e) => {
        e.preventDefault()  //VIGTIG ved submit af form

        let t = {
            "fields": {
                "Todos": updatedTodo,
                "Category": [
                    updatedCategory
                ]
            }
        }

        // send til hook som sender til API
        patchData('https://api.airtable.com/v0/appYosUeFMUaF80ZU/Todobase/' + id, t,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
                "Content-Type": "application/json"
            }
        )
    }


    return (
        <div className='container'>

            <Title headline='Ret uvalgt todo' />

            { (loading || loadingPatch || loadingCategories) && <Loader /> }
            { (error || errorPatch || errorCategories) && <Error /> }

            <div className='row'>
                <div className='col'>

                    { data &&

                        <form onSubmit={ handleSubmit }>

                            <div className='mb-3 mt-3'>
                                <label className='form-label me-3'>Ret todo:
                                    <input type='text' defaultValue={ data.fields.Todos } onInput={ e => setUpdatedTodo(e.target.value) } className='form-control ' />
                                </label>
                            </div>

                            {/* Kategorierne u dropdown */ }
                            <div className='mb-3 mt-3'>
                                <label className='form-label me-3'>Vælg en Kategorie
                                    <select defaultValue={ data.fields.Category[0] } onChange={ e => setUpdatedCategory(e.target.value) } className='form-select'>

                                        {
                                            dataCategories && dataCategories.records.map(c =>
                                                <option value={ c.id } key={ c.id }>
                                                    { c.fields.Name }
                                                </option>
                                            )
                                        }
                                    </select>
                                </label>

                            </div>


                            <button type='submit' className='btn btn-primary'>Ret todo</button>
                        </form>

                    }

                </div>
            </div>
        </div >
    )
}

export default TodoEdit