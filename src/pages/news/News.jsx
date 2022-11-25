import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import NewsCard from '../../components/NewsCard'

// import eget hook - som laver request til API
import { useGetData } from '../../hooks/useGetData'

const News = () => {
  const { error, loading, data, getData } = useGetData()

  // states
  const [search, setSearch] = useState('vm') //søgeord
  const [category, setCategory] = useState('sports') //kategori
  const [country, setCountry] = useState('us') //country

  // Søgning - når component loader
  useEffect(() => {
    callAPI()
  }, [])

  // Søg - kald API
  const handleSubmit = (e) => {
    e.preventDefault(); // forhindrer reload af siden (skal undgås fordi det tømmer state)
    // getData('https://newsapi.org/v2/top-headlines?country=se&category=sports&q=' + search + '&apiKey=' + process.env.REACT_APP_NEWSAPIKEY)
    callAPI()
  }

  const callAPI = () => {
    getData('https://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&q=' + search + '&apiKey=' + process.env.REACT_APP_NEWSAPIKEY)
  }


  return (
    <div className='News container'>

      <Title headline='News - search' />

      {loading && <Loader />}
      {error && <Error />}

      <div className='row mb-5'>


        <form onSubmit={handleSubmit}>

          {/* Søgning - Søgeord */}
          <div className='col-6 mb-3 mt-3'>
            <input type="text" defaultValue={search} onInput={e => setSearch(e.target.value)} className='form-control' placeholder='Søg noget' />
          </div>

          {/* Kategori - vælg kategori  */}
          <div className='col-6 mb-3 mt-3' >
            <select defaultValue={category} onChange={e => setCategory(e.target.value)} className='form-select'>
              <option>business</option>
              <option>entertainment</option>
              <option>general</option>
              <option>health</option>
              <option>science</option>
              <option>sports</option>
            </select>
          </div>

          {/* COUNTRY - vælg et land */}
          <div className='col-6 mb-3 mt-3'>
            <input list='countryList' onInput={e => setCountry(e.target.value)} className='form-control' />
            <datalist id='countryList'>
              <option value="ae" />
              <option value="ar" />
              <option value="at" />
              <option value="au" />
              <option value="be" />
              <option value="bg" />
              <option value="br" />
              <option value="ca" />
              <option value="ch" />
              <option value="cn" />
              <option value="co" />
              <option value="cu" />
              <option value="cz" />
              <option value="de" />
              <option value="eg" />
              <option value="fr" />
              <option value="gb" />
              <option value="gr" />
              <option value="hk" />
              <option value="hu" />
              <option value="id" />
              <option value="ie" />
              <option value="il" />
              <option value="in" />
              <option value="it" />
              <option value="jp" />
              <option value="kr" />
              <option value="lt" />
              <option value="lv" />
              <option value="ma" />
              <option value="mx" />
              <option value="my" />
              <option value="ng" />
              <option value="nl" />
              <option value="no" />
              <option value="nz" />
              <option value="ph" />
              <option value="pl" />
              <option value="pt" />
              <option value="ro" />
              <option value="rs" />
              <option value="ru" />
              <option value="sa" />
              <option value="se" />
              <option value="sg" />
              <option value="si" />
              <option value="sk" />
              <option value="th" />
              <option value="tr" />
              <option value="tw" />
              <option value="ua" />
              <option value="us" />
              <option value="ve" />
              <option value="za" />
            </datalist>
          </div>

          <button className='btn btn-primary'>Søg</button>

        </form>

        <div className='mt-3'>

          {
            // data && <p>Antal match: {data.totalResults}</p>
            // data ?
            //   (data.articles.length ? <p>Antal match: {data.totalResults}</p> : <p>Desværre ingen match</p>) : null

            // hvis der er data og de har en length
            data?.articles.length ? <p>Antal match: {data.totalResults}</p> : <p>Desværre ingen match</p>
          }
        </div>
      </div>


      <div className='row row-cols-1 row-cols-md-3 g-3'>

        {
          data && data.articles.map((a, i) =>

            <NewsCard newsEvent={a} key={'news' + i} />

            // <div className='col' key={'news' + i}>

            //   <div className='card h-100'>

            //     <img src={a.urlToImage} alt={a.title} className='card img-top' />

            //     <div className='card-body'>

            //       <div className='title'>
            //         <h4>{a.title}</h4>
            //         <p><small class='text-muted'>{a.publishedAt}</small></p>
            //       </div>

            //       <div className='card-text'>
            //         <p>{a.description}</p>
            //         <p><a href={a.url} target='_blank'>Læs mere</a> </p>
            //       </div>

            //     </div>
            //   </div>
            // </div>
          )
        }

      </div>

    </div>


  )
}

export default News