import { useEffect, useState } from 'react';
//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import Title from '../../components/Title';

const Starships = () => {

    // request-hook
    const { error, loading, data, getData } = useGetData()

    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {

        getData('https://swapi.dev/api/starships/?page=' + pageNumber)



    }, [pageNumber])



    return (
        <div className='Starships container'>

            {/* <h1>Starships</h1> */}
            {<Title headline='Starship' />}

            {/* ERROR */}
            {/* {error && <h2>Det er sket en fejl - måske er der ikke en starship som matcher den indtastede ID?</h2>} */}
            {error && <Error />}

            {/* LOADING */}
            {/* {loading && <h2>Det loades ...</h2>} */}
            {loading && <Loader />}

            {
                data &&

                <>
                    <div className='row row-cols-1 row-cols-md4 g-2'>

                        {  data.results.map((d, i) =>

                                <div className='col' key={'starship' + i}>
                                    <div className='card h-100'>
                                    <div className='card-body'>
                                        <h2>{d.name}</h2>
                                    </div>
                                    </div>
                                </div>

                            )}
                    </div>
                    
                    <button disabled={data.previous ? false : true} onClick={() => { setPageNumber(pageNumber - 1) }}>&lt;&lt;Prev</button>
                    <button disabled={data.next ? false : true} onClick={() => { setPageNumber(pageNumber + 1) }}>Next &gt;&gt;</button>
                </>
            }
        </div>



    )
}

export default Starships