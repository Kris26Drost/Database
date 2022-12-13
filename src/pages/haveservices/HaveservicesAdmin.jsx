import { useEffect } from 'react';
import Title from '../../components/Title';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom'
// icons
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData';

// import eget hook - giver adgang til delete
// import { useDeleteData } from '../../hooks/useDeleteData';

const HaveservicesAdmin = () => {

  const { error, loading, data, getData } = useGetData()
  // const { error: errordelete, loading: loadingdelete, data: datadelete, deleteData } = useDeleteData()

  // Kald api og GET data
  useEffect(() => {
    // hent alle produkter fra eget api
    getData('http://localhost:5001/haveservices')

  }, [])
  //}, [datadelete])  lytter på ændringer i datadelete-state (fra og henter (nye) data ved ændringer)


  return (
    <div className='container HaveservicesAdmin'>
      <Title headline='ADMIN' />
      <p>...med mulighed for opret - ret - slet</p>

      {/* ERROR */ }
      { (error) && <Error /> }

      {/* LOADING */ }
      { (loading) && <Loader /> }

      <div className='row row-cols-1 row-cols-md-4 g-2'>

        { data && data.map((h) =>

          <div className='col' key={ h._id }>
            <div className='card h-100'>
              <div className='card-body'>

                <h4>{ h.title }</h4>
                <p>{ h.content }...</p>

              </div>
              <div className='card-footer'>
                <Link to={ '/rethaveservice/' + h._id }><AiOutlineEdit size='2em' /></Link>
                <AiOutlineDelete style={ { cursor: 'pointer' } } size='2em' />
              </div>
            </div>
          </div>

        ) }

      </div>
    </div>

  )
}

export default HaveservicesAdmin