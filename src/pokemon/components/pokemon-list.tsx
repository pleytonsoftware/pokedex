import type { PokemonItemInfo } from './pokemon-item'

import { type FC, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useNavigate } from 'react-router'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert'
import { AudioPlayer } from '@/core/components/audio-player'
import { Button } from '@/core/components/button'
import { Drawer, DrawerContent, DrawerFooter, DrawerTitle } from '@/core/components/drawer'
import { Loading } from '@/core/components/loading'
import { usePaginationContext } from '@/core/hooks/pagination-context'
import { PokemonTypeBadges } from '@/pokemon-types/components/types'
import { routerTree } from '@/router.tree'
import { useGSAP } from '@gsap/react'

import { usePokemonList } from '../hooks/use-list-pokemon'
import { PokemonItemCard } from './pokemon-item-card'

gsap.registerPlugin(ScrollTrigger)

export interface PokemonListProps extends Pick<ReturnType<typeof usePokemonList>, 'data' | 'isLoading' | 'error'> {}

export const PokemonList: FC<PokemonListProps> = ({ data, isLoading, error }) => {
  const { nextPage, offset, pageSize } = usePaginationContext()
  const [pokemonAtDrawer, setPokemonAtDrawer] = useState<PokemonItemInfo>()
  const navigate = useNavigate()

  // ! GSAP when scrolling, items start disappearing
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

  const listRendered = useMemo(
    () => (
      <div className='flex flex-col mx-auto max-w-screen-2xl p-4'>
        {data?.count && (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => nextPage()}
            initialLoad={false}
            hasMore={data.count - (offset + pageSize) > 0}
            loader={<Loading className='col-span-3 mt-4' />}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'
          >
            {data?.results
              .slice(0, offset + pageSize)
              .map((pokemon) => (
                <PokemonItemCard
                  name={pokemon.name}
                  key={pokemon.name}
                  onItemClick={(_evt, pokemon) => setPokemonAtDrawer(pokemon)}
                />
              ))}
          </InfiniteScroll>
        )}
        {isLoading && <Loading className='mt-4' />}
        {error && (
          <Alert variant='destructive'>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </div>
    ),
    [data.count, data?.results, offset, pageSize, isLoading, error, nextPage],
  )

  return (
    <>
      {listRendered}
      {pokemonAtDrawer && (
        <Drawer onOpenChange={() => setPokemonAtDrawer(undefined)} open={Boolean(pokemonAtDrawer)}>
          <DrawerContent
            aria-describedby='drawer-description'
            className='min-h-[80vh] md:min-h-96 outline-none text-neutral-100 bg-[var(--tw-bg-color)] border-none bg-pokemon-type-gradient'
            style={pokemonAtDrawer.pokemonColorStyle}
          >
            <DrawerTitle className='flex flex-col gap-4 justify-center items-center h-full mt-4'>
              <span className='flex gap-2'>
                <span className='text-3xl capitalize'>{pokemonAtDrawer.formattedName}</span>
                <span className='text-xs mt-1'>#{pokemonAtDrawer.formattedId}</span>
              </span>
            </DrawerTitle>
            <div className='flex flex-col gap-4 justify-center items-center h-full mt-4'>
              {pokemonAtDrawer.image && (
                <img src={pokemonAtDrawer.image} alt={pokemonAtDrawer.formattedName} className='relative h-40' />
              )}
              <PokemonTypeBadges types={pokemonAtDrawer.types} />
              {pokemonAtDrawer.sound && <AudioPlayer src={pokemonAtDrawer.sound} />}
            </div>
            <DrawerFooter className='flex'>
              <Button
                variant='ghost'
                className='w-fit self-center hover:bg-white/10 hover:text-neutral-100'
                onClick={() => navigate(routerTree.home.pokemons.details.replace(':id', pokemonAtDrawer.name))}
              >
                <span>
                  See <span className='capitalize'>{pokemonAtDrawer.name}</span> details
                </span>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
