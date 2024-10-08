import { type FC } from 'react'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useIntersectionObserver } from 'usehooks-ts'

import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert'
import { Loading } from '@/core/components/loading'
import { usePagination } from '@/core/hooks/pagination'
import { useGSAP } from '@gsap/react'

import { usePokemonList } from '../hooks/use-list-pokemon'
import { PokemonItemCard } from './pokemon-item-card'

gsap.registerPlugin(ScrollTrigger)

export interface PokemonListProps {}

export const PokemonList: FC<PokemonListProps> = () => {
  const { offset, pageSize, nextPage } = usePagination({ initialPage: 1, pageSize: 3 * 5 })
  const { data, isLoading, error } = usePokemonList()
  const [ref] = useIntersectionObserver({
    threshold: 0.1,
    onChange: (isIntersecting) => {
      if (!isIntersecting) return
      nextPage()
    },
  })

  useGSAP(() => {
    ScrollTrigger.batch('.pokemon-item', {
      interval: 0.1,
      batchMax: 3,
      onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, stagger: 0.1, overwrite: true }),
      onLeave: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
      onEnterBack: (batch) => gsap.to(batch, { autoAlpha: 1, stagger: 0.1, overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
    })
  }, [offset])

  return (
    <div className='flex flex-col mx-auto lg:max-w-screen-lg p-4'>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.results
          .slice(0, offset + pageSize)
          .map((pokemon) => <PokemonItemCard ref={ref} name={pokemon.name} key={pokemon.name} />)}
      </section>
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
