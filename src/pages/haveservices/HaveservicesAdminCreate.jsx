import React, { useEffect } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { usePostData } from '../../hooks/usePostData'

// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css';


const HaveservicesAdminCreate = () => {

  // hook til post/opret data
  const { error, loading, data, postData } = usePostData()


  // Tøm inputfelt efter post
  useEffect(() => {
    if (data) {
      document.querySelector("form").reset()
    }
  }, [data])


  // Send data til api 
  const handleSubmit = (e) => {
    e.preventDefault()  //VIGTIG ved submit af form

    // nyt produkt gøres klar - skal være multipart-formdata
    let fd = new FormData(e.target) // formularen gøres til et formdata-objekt

    // send til hook som sender til API
    postData('http://localhost:5001/haveservices', fd)
  }


  return (
    <div className='container HaveservicesAdminCreate'>
      <Title headline='ADMIN: Opret nyt haveservice' />

      {/* ERROR */ }
      { (error) && <Error /> }

      {/* LOADING */ }
      { (loading) && <Loader /> }

      { data && <h2>"{ data.created.title }" er oprettet og fik id: { data.created._id }</h2> }


      <div className='row'>
        <div className='col'>

          <form onSubmit={ handleSubmit }>

            {/* Title */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast haveservicet title:
                <input type='text' name='title' className='form-control ' />
              </label>
            </div>

            {/* Content */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast haveservicet content:
                <textarea name='content' required className='form-control ' />
              </label>
            </div>

            {/* Image */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Vælg haveservicet billede:
                <input type='file' name='image' required className='form-control ' />
              </label>
            </div>

            <button type='submit' className='btn btn-primary'>Opret ny haveservice</button>
          </form>

        </div>
      </div>

    </div>
  )
}

export default HaveservicesAdminCreate