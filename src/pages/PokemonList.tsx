import { Link } from 'react-router-dom'

export const PokemonListPage = () => {
  return (
    <div>
      pokemon list
      <li>
        <ul>
          <Link to={`/pokemon/1`}>Pokemon #1</Link>
        </ul>
      </li>
    </div>
  )
}

export default PokemonListPage
