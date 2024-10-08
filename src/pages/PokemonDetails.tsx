import { useParams } from 'react-router'

import { useGetPokemon } from '@/pokemon/hooks/use-get-pokemon'

import NotFoundPage from './NotFound'

const PokemonDetailsPage = () => {
  const { id } = useParams()

  const { data, isFetched } = useGetPokemon(id || '', {
    enabled: Boolean(id),
  })

  if (!id || (isFetched && !data)) {
    return <NotFoundPage />
  }

  return <div>{data?.name}</div>
}

export default PokemonDetailsPage
