import React, { useEffect } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import { useGetData } from '../../hooks/useGetData'

const Haveservices = () => {

  const { error, loading, data, getData } = useGetData() //hent product der skal rettes

  useEffect(() => {

    // Produkt der skal rettes
    getData('http://localhost:5001/haveservices')

  }, [])

  return (
    <div className='container Haveservices bg-success text-light p-3'>

      <Title headline='Vores ydelser' />
      <hr className='m-auto' width='200' />
      <p className='text-center m-3'>Herunder en oversigt over alle vore services. <br />
        Hvis du måtte have flere spørgsmål, er du velkommen til at kontakte os.</p>

      {/* ERROR */ }
      { (error) && <Error /> }

      {/* LOADING */ }
      { (loading) && <Loader /> }

      <div className='row'>


        {
          data && data.map((h) =>
            <div className='col m-1' key={ h._id }>

            
                <img className='border border-5 rounded-circle m-auto' style={{borderColor: 'red'}} src={ 'http://localhost:5001/images/' + h.image } alt='' width='250' height='250' />
              

              <h4>{ h.title }</h4>
              <p>{ h.content }</p>

            </div>

          )
        }



      </div>



    </div>
  )
}

export default Haveservices