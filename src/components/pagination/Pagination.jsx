import React from 'react'
import './Pagination.scss'

// TRANSITION EFFECT 

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage, itemsTotal }) => {

    //Bergen hvor mange 'sider' der skal være - beregn ud fra antal-items-i-alt divideret med items-per.side og 'rund op'
    let numberOfPages = Math.ceil(itemsTotal / itemsPerPage) //hvis det er en item tilbage så skal den har sin egne sidde


    return (
        <div className='Pagination'>
            <button disabled={currentPage <= 0} className='btn btn-success' onClick={() => setCurrentPage(currentPage - 1)}>&lt;&lt;Prev</button>

            {/* Pagination side-buttons */}
            {
                [...Array(numberOfPages)].map((x, i) =>

                    <button className={i === currentPage ? 'btn btn-success' : 'btn btn-light'} onClick={() => setCurrentPage(i)}>{i + 1}</button>
                )
            }


            {/* NEXT */}
            <button disabled={currentPage >= numberOfPages - 1} className='btn btn-success' onClick={() => setCurrentPage(currentPage + 1)}>Next &gt;&gt;</button>
        </div>
    )
}

export default Pagination