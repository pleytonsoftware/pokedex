import { useEffect, useState } from 'react'

import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts'

import { UseQueryOptions, useQuery } from '@tanstack/react-query'

const api = new PokemonClient()

interface PokemonTypeInfoResult extends NamedAPIResourceList {
  hasMore: boolean
}

// TODO to be removed
export interface PokemonTypeInfo {
  id: number
  name: string
  types: string[]
  image: string | null
  cries: string | null
}

const fetchPokemonList = async (
  limit: number = Number.MAX_SAFE_INTEGER,
  offset: number = 0,
): Promise<PokemonTypeInfoResult> => {
  const pokemonList = await api.listPokemons(offset, limit)

  return {
    ...pokemonList,
    hasMore: pokemonList.count > offset + pokemonList.results.length,
  }
}

export const usePokemonList = (
  options?: UseQueryOptions<PokemonTypeInfoResult, Error, PokemonTypeInfoResult, Array<string | number>>,
) => {
  const [dataList, setDataList] = useState<PokemonTypeInfoResult['results']>([])
  const result = useQuery<PokemonTypeInfoResult, Error, PokemonTypeInfoResult, Array<string | number>>({
    queryKey: ['pokemon', 'list'],
    queryFn: () => fetchPokemonList(),
    retry: 2,
    ...options,
  })

  useEffect(() => {
    if (!result.data) return
    setDataList((prev) => [...prev, ...result.data.results])
  }, [result.data])

  return {
    ...result,
    data: {
      ...result.data,
      results: dataList,
    },
  }
}
