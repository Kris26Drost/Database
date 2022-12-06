import { useEffect } from 'react';
import Title from '../../components/Title';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

import TodoCard from '../../components/TodoCard';

//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData';

const Todos = () => {

    // request-hook
    const { error, loading, data, getData } = useGetData()

    useEffect(() => {

        getData('https://api.airtable.com/v0/appYosUeFMUaF80ZU/Todobase',
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY }
            
        )

    }, [])



    return (
        <div className='Todos container'>

            <Title headline='Mine TODOS' />

            {/* ERROR */ }
            { error && <Error /> }

            {/* LOADING */ }
            { loading && <Loader /> }



            <div className='row row-cols-1 row-cols-md4 g-2'>

                { data && data.records.map((t) =>

                    <div className='col' key={ t.id }>
                       <TodoCard t={t} />
                    </div>

                ) }
 
            </div>
        </div>
    )
}

export default Todos