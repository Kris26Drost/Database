import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

// import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData'


// https://rapidapi.com/apininjas/api/hobbies-by-api-ninjas/
// REACT_APP_RAPIDAPIKEY


const Hobbies = () => {
    
    const { error, loading, data, getData } = useGetData()

    // ved klik på fx knap
    const handleClick = () => {
        getData('https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies',
            {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
                'X-RapidAPI-Host': 'hobbies-by-api-ninjas.p.rapidapi.com',
            },
            { category: 'general' }
        )
    }


    return (
        <div className='container'>
            <Title headline='Vælg din (tilfældige) hobby' />

            {loading && <Loader />}
            {error && <Error />}

            {data && <div className='card'>
                <div className='card-body'>
                    <div className='card-title text-center'>

                        <h2 className='display-2'>
                            <a href={data.link} target='_blank'>{data.hobby}</a>
                        </h2>
                    </div>
                </div>
            </div>
            }

            <button onClick={handleClick} className='btn btn-success mt-5'>Gi' mig en hobby!</button>
        </div>

    )
}

export default Hobbies