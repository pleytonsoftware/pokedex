import ms from 'ms'
import { type Pokemon, PokemonClient } from 'pokenode-ts'

import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

const client = new PokemonClient()

export const useGetPokemon = (
  idName: string,
  options?: Omit<UseQueryOptions<Pokemon, Error, Pokemon, Array<string | number>>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<Pokemon, Error, Pokemon, Array<string | number>>({
    queryKey: ['pokemon', idName],
    queryFn: () => client.getPokemonByName(idName),
    gcTime: ms('24h'),
    retry: 2,
    ...options,
  })
}
