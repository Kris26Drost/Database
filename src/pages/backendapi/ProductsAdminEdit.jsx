import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { useGetData } from '../../hooks/useGetData'
import { usePutData } from '../../hooks/usePutData'
import { useParams, useNavigate } from 'react-router-dom'

const ProductsAdminEdit = () => {

  const { id } = useParams() //snup id fra url (tjek i App.jsx - hvor "id" er navngivet/sat)
  const navigate = useNavigate() // så brugeren kan redirectes retur til adminsiden efter rettelse

  //GET data (product ud fra ID)
  const { error, loading, data, getData } = useGetData() //hent product der skal rettes

  //PUT data (når produktet er rettet og skal gemmes)
  const { error: errorPut, loading: loadingPut, data: dataPut, putData } = usePutData()



  // 1) Hent den todo der skal rettes (når component loader)
  useEffect(() => {

    // Produkt der skal rettes
    getData('http://localhost:5000/product/' + id)

  }, [])


  // 3) Lyt efter rettelser - og redirect til adminsiden når...
  useEffect(() => {

    //  hvis der er data fra patch-requestet = færdig med at rette
    if (dataPut) {
      navigate('/adminproduct')
    }

  }, [dataPut])



  // 2) Send data til api 
  const handleSubmit = (e) => {
    e.preventDefault()  //VIGTIG ved submit af form

    let fd = new FormData(e.target) 

    //send til hook som sender til API
    putData( 'http://localhost:5000/product/' + id, fd, null, null)
  }

  return (
    <div className='container ProductsAdminEdit'>
      <Title headline='ADMIN: Ret eksisterende produkt her' />


      {/* ERROR */ }
      { (error) && <Error /> }

      {/* LOADING */ }
      { (loading) && <Loader /> }

      {/* { data && <h2>"{ data.created.name }"" er oprettet og fik id: { data.created._id }</h2> } */ }


      <div className='row'>
        <div className='col'>

          <form onSubmit={ handleSubmit }>

            {/* Name */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast produktets navn:
                <input defaultValue={ data?.name } type='text' name='name' className='form-control ' />
              </label>
            </div>

            {/* Description */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast produktets beskrivelse:
                <textarea defaultValue={ data?.description } name='description' required className='form-control ' />
              </label>
              {/* <ReactQuill onChange={ setQuillInput } theme='snow' plceholder='Beskriv produktet' /> */ }
            </div>

            {/* Price */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast produktets pris:
                <input defaultValue={ data?.price } type='number' name='price' className='form-control ' />
              </label>
            </div>

            {/* Image */ }
            <div className='mb-3 mt-3'>

                {
                  data && 
                  <div>
                  Nuværende image: <img src={ 'http://localhost:5000/images/' + data.image } alt='' width='150' />
                  </div>
                }
                
              <label className='form-label me-3'>Vælg produktets billede (overskirver det sksisternde):
                <input type='file' name='image' className='form-control ' />
              </label>
            </div>

            <button type='submit' className='btn btn-primary'>Ret produkt</button>
          </form>

        </div>
      </div>

    </div>
  )
}

export default ProductsAdminEdit