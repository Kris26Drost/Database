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

const ProductsAdmin = () => {

  const { error, loading, data, getData } = useGetData()
  // const { error: errordelete, loading: loadingdelete, data: datadelete, deleteData } = useDeleteData()

  // Kald api og GET data
  useEffect(() => {
    // hent alle produkter fra eget api
    getData('http://localhost:5000/product')

  }, [])
  //}, [datadelete])  lytter på ændringer i datadelete-state (fra og henter (nye) data ved ændringer)


  return (
    <div className='container ProductsAdmin'>
      <Title headline='ADMIN' />
      <p>...med mulighed for opret - ret - slet</p>

      {/* ERROR */ }
      { (error) && <Error /> }

      {/* LOADING */ }
      { (loading) && <Loader /> }

      <div className='row row-cols-1 row-cols-md-4 g-2'>

        { data && data.map((p) =>

          <div className='col' key={ p._id }>
            <div className='card h-100'>
              <div className='card-body'>

                <h4>{ p.name }</h4>
                <p>{ p.description }...</p>

              </div>
              <div className='card-footer'>
                <Link to={ '/retproduct/' + p._id }><AiOutlineEdit size='2em' /></Link>
                <AiOutlineDelete style={ { cursor: 'pointer' } } size='2em' />
              </div>
            </div>
          </div>

        ) }

      </div>
    </div>

  )
}

export default ProductsAdmin