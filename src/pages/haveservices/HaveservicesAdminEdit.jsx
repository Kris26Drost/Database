import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { useGetData } from '../../hooks/useGetData'
import { usePutData } from '../../hooks/usePutData'
import { useParams, useNavigate } from 'react-router-dom'

const HaveservicesAdminEdit = () => {

  const { id } = useParams() //snup id fra url (tjek i App.jsx - hvor "id" er navngivet/sat)
  const navigate = useNavigate() // så brugeren kan redirectes retur til adminsiden efter rettelse

  //GET data (product ud fra ID)
  const { error, loading, data, getData } = useGetData() //hent product der skal rettes

  //PUT data (når produktet er rettet og skal gemmes)
  const { error: errorPut, loading: loadingPut, data: dataPut, putData } = usePutData()



  // 1) Hent den todo der skal rettes (når component loader)
  useEffect(() => {

    // Produkt der skal rettes
    getData('http://localhost:5001/haveservices/' + id)

  }, [])


  // 3) Lyt efter rettelser - og redirect til adminsiden når...
  useEffect(() => {

    //  hvis der er data fra patch-requestet = færdig med at rette
    if (dataPut) {
      navigate('/adminhaveservices')
    }

  }, [dataPut])



  // 2) Send data til api 
  const handleSubmit = (e) => {
    e.preventDefault()  //VIGTIG ved submit af form

    let fd = new FormData(e.target) 

    //send til hook som sender til API
    putData( 'http://localhost:5001/haveservices/' + id, fd, null, null)
  }

  return (
    <div className='container HaveservicesAdminEdit'>
      <Title headline='ADMIN: Ret eksisterende haveservice her' />

      {/* ERROR */ }
      { (error) && <Error /> }

      {/* LOADING */ }
      { (loading) && <Loader /> }

      {/* { data && <h2>"{ data.created.title }"" er oprettet og fik id: { data.created._id }</h2> } */ }


      <div className='row'>
        <div className='col'>

          <form onSubmit={ handleSubmit }>

            {/* Title */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast haveservicets tite:
                <input defaultValue={ data?.title } type='text' name='title' className='form-control ' />
              </label>
            </div>

            {/* Content */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast haveservicets content:
                <textarea defaultValue={ data?.content } name='content' required className='form-control ' />
              </label>
            </div>

            {/* Image */ }
            <div className='mb-3 mt-3'>
              
                {
                  data && 
                  <div>
                  Nuværende image: <img src={ 'http://localhost:5001/images/' + data.image } alt='' width='150' />
                  </div>
                }
                
              <label className='form-label me-3'>Vælg haveservicets billede (overskirver det eksisternde):
                <input type='file' name='image' className='form-control ' />
              </label>
            </div>

            <button type='submit' className='btn btn-primary'>Ret haveservicet</button>
          </form>

        </div>
      </div>

    </div>
  )
}

export default HaveservicesAdminEdit