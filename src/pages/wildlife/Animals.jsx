import { useEffect } from 'react';
import Title from '../../components/Title';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

import AnimalCard from '../../components/AnimalCard';

//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData';

const Animals = () => {

    // request-hook
    const { error, loading, data, getData } = useGetData()

    useEffect(() => {

        getData('https://api.airtable.com/v0/appEt2FPO3ormMpjQ/Wildlife',
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY }
        )

    }, [])



    return (
        <div className='Wildlife container'>

            <Title headline='Wildlife Animals' />

            {/* ERROR */ }
            { error && <Error /> }

            {/* LOADING */ }
            { loading && <Loader /> }



            <div className='row row-cols-1 row-cols-md4 g-2'>

                { data && data.records.map((w) =>

                    <div className='col' key={ w.id }>
                       <AnimalCard w={w} />
                    </div>

                ) }
 
            </div>
        </div>
    )
}

export default Animals