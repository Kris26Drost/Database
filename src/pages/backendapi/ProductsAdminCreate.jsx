import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { usePostData } from '../../hooks/usePostData'

// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css';


const ProductsAdminCreate = () => {

  // hook til post/opret data
  const { error, loading, data, postData } = usePostData()
  // tekst fra Quill
  const [quillInput, setQuillInput] = useState()


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
    // fd.append("description", quillInput) //produktest description hentes fra state fordi Quill ikke er et form-element

    // send til hook som sender til API
    postData('http://localhost:5000/product', fd)
  }


  return (
    <div className='container ProductsAdminCreate'>
      <Title headline='ADMIN: Opret nyt produkt' />

      {/* ERROR */ }
      { (error) && <Error /> }

      {/* LOADING */ }
      { (loading) && <Loader /> }

      { data && <h2>"{ data.created.name }" er oprettet og fik id: { data.created._id }</h2> }


      <div className='row'>
        <div className='col'>

          <form onSubmit={ handleSubmit }>

            {/* Name */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast produktets navn:
                <input type='text' name='name' className='form-control ' />
              </label>
            </div>

            {/* Description */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast produktets beskrivelse:
                <textarea name='description' required className='form-control ' />
              </label>
              {/* <ReactQuill onChange={setQuillInput} theme='snow' plceholder='Beskriv produktet' /> */}
            </div>

            {/* Price */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Indtast produktets pris:
                <input type='number' name='price' className='form-control ' />
              </label>
            </div>

            {/* Image */ }
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'>Vælg produktets billede:
                <input type='file' name='image' required className='form-control ' />
              </label>
            </div>

            <button type='submit' className='btn btn-primary'>Opret ny produkt</button>
          </form>

        </div>
      </div>

    </div>
  )
}

export default ProductsAdminCreate