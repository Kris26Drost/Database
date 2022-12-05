import { useEffect } from 'react';
import Title from '../../components/Title';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom'

// icons
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData';
// 
import { useDeleteData } from '../../hooks/useDeleteData';


const AnimalsAdmin = () => {

  // request-hook
  const { error, loading, data, getData } = useGetData()
  const { error: errordelete, loading: loadingdelete, data: datadelete, deleteData } = useDeleteData()

  useEffect(() => {

    getData('https://api.airtable.com/v0/appEt2FPO3ormMpjQ/Wildlife',
      { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY }
      ,
      [{ field: "Animal", direction: "desc" }]
    )

  }, [datadelete]) // lytter på ændringer i datadelete-state (fra og henter (nye) data ved ændringer)

  // Kald hook og api og slet
  const handleDelete = (id) => {


    if (window.confirm("Er du sikke på at du vil slette?")) {

      //  console.log("Slet todo nu - med id:", id)
      deleteData('https://api.airtable.com/v0/appEt2FPO3ormMpjQ/Wildlife/' + id,
        { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY }
      )
    }
  }


  return (
    <div className='Animalsadmin container'>

      <Title headline='Admin Animals' />

      {/* ERROR */ }
      { (error || errordelete) && <Error /> }

      {/* LOADING */ }
      { (loading || loadingdelete) && <Loader /> }



      <div className='row row-cols-1 row-cols-md4 g-2'>

        { data && data.records.map((t) =>

          <div className='col' key={ t.id }>
            <div className='card h-100'>
              <div className='card-body'>
                <h4>{ t.fields.Animal }</h4>
                <p>
                  { new Date(t.createdTime).toLocaleString("da-dk", { year: "numeric", month: "short", day: "numeric" }) }
                  &nbsp; kl. &nbsp;
                  { new Date(t.createdTime).toLocaleTimeString("da-dk", { hour: "2-digit", minute: "2-digit" }) }
                </p>
              </div>
              <div className='card-footer'>
                {/* <button className='btn btn-warning'>RET</button>
                <button onClick={ () => handleDelete(t.id) } className='btn btn-danger me-2'>SLET</button> */}
                <Link to={'/retanimal/' + t.id}><AiOutlineEdit size='2em' /></Link>
                <AiOutlineDelete onClick={ () => handleDelete(t.id) } style={ { cursor: 'pointer' } } size='2em' />
              </div>
            </div>
          </div>

        ) }

      </div>
    </div>
  )
}

export default AnimalsAdmin