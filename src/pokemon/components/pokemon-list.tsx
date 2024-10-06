import { type FC, useEffect, useMemo } from 'react'

import { useIntersectionObserver } from 'usehooks-ts'

import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert'
import { Loading } from '@/core/components/loading'
import { usePagination } from '@/core/hooks/pagination'

import { usePokemonList } from '../hooks/use-list-pokemon'
import { PokemonItem } from './pokemon-item'

export interface PokemonListProps {}

export const PokemonList: FC<PokemonListProps> = () => {
  const { offset, pageSize, nextPage } = usePagination({ initialPage: 1, pageSize: 3 * 5 })
  const { data, isLoading, error, refetch, isFetching } = usePokemonList(pageSize, offset)
  const [ref] = useIntersectionObserver({
    threshold: 0.1,
    onChange: (isIntersecting) => {
      if (!isIntersecting || isFetching) return
      nextPage()
    },
  })

  useEffect(() => {
    refetch()
  }, [pageSize, offset, refetch])

  const pokemonItems = useMemo(
    () =>
      data?.results.map((pokemon, index) => (
        <PokemonItem
          ref={data.results.length - Math.floor(pageSize * (1 / 3)) === index ? ref : undefined}
          pokemonItem={pokemon}
          key={pokemon.id}
        />
      )),
    [data, pageSize, ref],
  )

  return (
    <div className='flex flex-col mx-auto lg:max-w-screen-lg p-4'>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>{pokemonItems}</section>
      {isLoading && <Loading className='mt-4' />}
      {error && (
        <Alert variant='destructive'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
