import { useState, useEffect } from 'react'
import './App.css'
import getRandomNumber from './utils/getRandomNumber'
import axios from 'axios'
import LocationInfo from './components/LocationInfo'
import CardResident from './components/CardResident'
import FilterList from './components/FilterList'
import ErrorScreen from './components/ErrorScreen'
import Logo from "./assets/logo.png"

function App() {
  const [location, setLocation] = useState()
  const [search, setSearch] = useState("")
  const [list, setList] = useState()
  const [hasError, setHasError] = useState()


  useEffect(() => {
    let id = getRandomNumber()
    if (search) {
      id = search
    }
    const URL = `https://rickandmortyapi.com/api/location/${id}`
    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))


  }, [search])

  const handleSubmit = e => {
    e.preventDefault()
    setSearch(e.target.location.value)
  }

  const handleChange = e => {
    if (e.target.value === "") {
      return setList()
    } else {
      const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}`

      axios.get(URL)
        .then(res => setList(res.data.results))
        .catch(err => console.log(err))

    }

  }


  return (
    <article className="App">
      <img className='logo' src={Logo} alt="" />
      <section className='App-form'>
        <form onSubmit={handleSubmit}>
          <input id='location'
            placeholder='Enter a number from 1 to 126'
            type="text"
            onChange={handleChange}
          />
          <button>Search</button>
          <FilterList
            list={list}
            setSearch={setSearch}
          />
        </form>
      </section>
      {
        hasError ?
          <ErrorScreen />
          :
          <>
            <LocationInfo
              location={location}
            />
            <div className='card-container'>
              {
                location?.residents.map(url => (
                  <CardResident
                    key={url}
                    url={url}
                  />
                ))
              }

            </div>
          </>
      }


    </article>
  )
}

export default App
