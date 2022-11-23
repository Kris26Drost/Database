import { useEffect, useState } from 'react';
//import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData';
import Title from '../../components/Title';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const Users = () => {

    // request-hook
    const { error, loading, data, getData } = useGetData()

    // state til users
    const [userID, setUserID] = useState(5)

    useEffect(() => {

        //Undgå kald til api hvis der ikke er en ID i state
        if (userID !== '') {

            getData('https://jsonplaceholder.typicode.com/users/' + userID)
            
        }

    }, [userID])



    return (
        <div className='Users container'>
            <div className='row row-cols-1 row-cols-md-4 g-2'>

                {/* <h1>Users</h1> */}

                <Title headline='Users'/>

                {/* ERROR */}
                {/* {error && <h2>Det er sket en fejl - måske er der ikke en bruger som matcher den indtastede ID?</h2>} */}
                {error && <Error errormessage='Måske er der ikke en bruger som matcher den indtastede ID?'/>}

                {/* LOADING */}
                {/* {loading && <h2>Det loades ...</h2>} */}
                {loading && <Loader/>}


                <form className='my-3'>
                    <label htmlFor="inputUser">Tast en brugers ID</label>
                    <input type="number" onInput={e => setUserID(e.target.value)} min='1' className='form-control' placeholder='Brugers ID' id='inputUser' />
                </form>

                {/* Data - Users */}
                {
                    data && data.address &&
                    <div className='card'>
                        <div className='card-body'>

                            <h2>{data.name}</h2>

                            <p>Mail: <a href={'mailTo' + data.email}>{data.email}</a></p>
                            <p>By:{data.address.city}</p>

                            {
                                Object.entries(data.address).slice(0, 4).map(([k, v]) =>
                                    <p key={v}>{k}:{v}</p>
                                )
                            }
                        </div>
                    </div>
                }

            </div>


        </div>
    )
}

export default Users