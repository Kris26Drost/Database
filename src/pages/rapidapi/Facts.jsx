import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import Pagination from '../../components/pagination/Pagination'

import { useGetData } from '../../hooks/useGetData'


const Facts = () => {

    //pagination
    const [currentPage, setCurrentPage] = useState(0) //hvilken side skal vises nu - side 1 = 0
    const [itemsPerPage, setItemsPerPage] = useState(5) //hvor mangge/antal et-eller-andet pr. side

    const { error, loading, data, getData } = useGetData()

    useEffect(() => {

        getData('https://facts-by-api-ninjas.p.rapidapi.com/v1/facts',
            {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
                'X-RapidAPI-Host': 'facts-by-api-ninjas.p.rapidapi.com'
            },
            { limit: '30' }
        )

    }, [])

    return (
        <div className='Facts container'>
            <Title headline='Facts' />

            {loading && <Loader />}
            {error && <Error errormessage='Ingen data - øv' />}

            {/* PAGINATION */}
            {
                data &&
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} itemsTotal={data.length} />
            }


            {data && data.slice(currentPage * itemsPerPage, (currentPage * itemsPerPage) + itemsPerPage).map((f, i) =>
                <div className='card' key={'fact' + i}>
                    <div className='card-body'>
                        <small>{data.indexOf(f)}</small>
                        <h4 >{f.fact}</h4>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Facts