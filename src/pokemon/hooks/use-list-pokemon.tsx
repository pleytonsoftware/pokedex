import { useEffect, useState } from 'react'

import uniqBy from 'lodash/uniqBy'
import ms from 'ms'
import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts'

import { UseQueryOptions, useQuery } from '@tanstack/react-query'

const api = new PokemonClient()

interface PokemonTypeInfoResult extends Omit<NamedAPIResourceList, 'results'> {
  results: PokemonTypeInfo[]
  hasMore: boolean
}
export interface PokemonTypeInfo {
  id: number
  name: string
  types: string[]
  image: string | null
}

const fetchPokemonList = async (limit: number, offset: number): Promise<PokemonTypeInfoResult> => {
  const pokemonList = await api.listPokemons(offset, limit)
  const pokemonDetails = await Promise.all(
    pokemonList.results.map(async (pokemon) => {
      const details = await api.getPokemonByName(pokemon.name)
      return {
        id: details.id,
        name: details.name,
        types: details.types.map((typeInfo) => typeInfo.type.name),
        image: details.sprites.front_default,
      }
    }),
  )
  return {
    ...pokemonList,
    hasMore: pokemonList.count > offset + pokemonList.results.length,
    results: pokemonDetails,
  }
}

export const usePokemonList = (
  limit: number,
  offset: number,
  options?: UseQueryOptions<PokemonTypeInfoResult, Error, PokemonTypeInfoResult, Array<string | number>>,
) => {
  const [dataList, setDataList] = useState<PokemonTypeInfoResult['results']>([])
  const result = useQuery<PokemonTypeInfoResult, Error, PokemonTypeInfoResult, Array<string | number>>({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
    gcTime: ms('24h'),
    retry: 2,
    ...options,
  })

  useEffect(() => {
    if (!result.data) return
    setDataList((prev) =>
      uniqBy([...prev, ...result.data.results], (pokemon) => String(pokemon.id)).sort((a, b) => a.id - b.id),
    )
  }, [result.data])

  return {
    ...result,
    data: {
      ...result.data,
      results: dataList,
    },
  }
}
