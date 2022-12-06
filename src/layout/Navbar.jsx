
import { NavLink, Link } from 'react-router-dom';


const Navbar = () => {


  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">

        <a className="navbar-brand" href="#">Navbar</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink end className="nav-link" aria-current="page" to='/'>Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to='/user'>Users</NavLink>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">SWAPI</span>

              <ul className="dropdown-menu">
                <li> <NavLink className="dropdown-item" to='/species'>Species</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/starships'>Starships</NavLink> </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">NEWS API</span>

              <ul className="dropdown-menu">
                <li> <NavLink className="dropdown-item" to='/news'>News</NavLink> </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">RAPID API</span>

              <ul className="dropdown-menu">
                <li> <NavLink className="dropdown-item" to='hobbies'>Hobbies</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/facts'>Facts</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/lovecalc'>Love Calculator</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/pokemon'>Pokémon</NavLink> </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">WEATHER</span>

              <ul className="dropdown-menu">
                <li> <NavLink className="dropdown-item" to='weather1'>Vejr med postnummer</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/weather2'>Adresseopslag</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/weather3'>Map</NavLink> </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">OPGAVE EKS.</span>

              <ul className="dropdown-menu">
                <li> <NavLink className="dropdown-item" to='jokes'>Jokes!</NavLink> </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">AIRTABLE</span>

              <ul className="dropdown-menu">

                <li> <NavLink className="dropdown-item" to='/todos'>Todos</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/oprettodo'>CreateTodo</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/admintodo'>TodoAdmin</NavLink> </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">WILDLIFE</span>

              <ul className="dropdown-menu">

                <li> <NavLink className="dropdown-item" to='/animals'>Animals</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/opretanimal'>CreateAnimal</NavLink> </li>

                <li><hr className="dropdown-divider" /></li>

                <li> <NavLink className="dropdown-item" to='/adminanimal'>AnimalAdmin</NavLink> </li>
              </ul>
            </li>



          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar