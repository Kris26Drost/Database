import React from 'react'

const AnimalCard = ({w}) => {
    return (
        <div className='card h-100'>
            <div className='card-body'>
                <h4>{ w.fields.Animal }</h4>
                <p>{w.fields.Species_type}</p>
                <p>
                    { new Date(w.createdTime).toLocaleString("da-dk", { year: "numeric", month: "short", day: "numeric" }) }
                    &nbsp; kl. &nbsp;
                    { new Date(w.createdTime).toLocaleTimeString("da-dk", { hour: "2-digit", minute: "2-digit" }) }
                </p>
            </div>
        </div>
    )
}

export default AnimalCard