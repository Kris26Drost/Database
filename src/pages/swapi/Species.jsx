import { useEffect, useState } from 'react';
//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData';
import Title from '../../components/Title';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const Species = () => {

    // request-hook
    const { error, loading, data, getData } = useGetData()

    // state til users
    const [specieID, setSpecieID] = useState(5)

    useEffect(() => {

        //Undgå kald til api hvis der ikke er en ID i state
        if (specieID !== '') {

            getData('https://swapi.dev/api/species/' + specieID)

        }

    }, [specieID])



    return (
        <div className='Species container'>
            <div className='row row-cols-1 row-cols-md-4 g-2'>

                {/* <h1>Species</h1> */}
                <Title headline='Species'/>

                {/* ERROR */}
                {/* {error && <h2>Det er sket en fejl - måske er der ikke en specie som matcher den indtastede ID?</h2>} */}
                {error && <Error/>}

                {/* LOADING */}
                {/* {loading && <h2>Det loades ...</h2>} */}
                {loading && <Loader/>}


                <form className='my-3'>
                    <label htmlFor="inputSpecie">Tast en species ID</label>
                    <input type="number" onInput={e => setSpecieID(e.target.value)} min='1' className='form-control' placeholder='Specie ID' id='inputSpecie' />
                </form>

                {
                    data && 
                    <div className='card'>
                        <div className='card-body'>

                            <h2>{data.name}</h2>

                            <p>Classification:{data.classification}</p>
                            <p>Designation:{data.designation}</p>
                            <p>Average Lifespan:{data.average_lifespan}</p>
                            <p>Language:{data.language}</p>

                        </div>
                    </div>
                }
            </div>


        </div>
    )
}

export default Species