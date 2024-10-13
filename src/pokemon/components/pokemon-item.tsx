import type { PokemonTypeInfo } from '../hooks/use-list-pokemon'

import { type MouseEventHandler, forwardRef, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import Color from 'color'

import { AudioPlayer } from '@/core/components/audio-player'
import { Button } from '@/core/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card'
import { Drawer, DrawerContent, DrawerFooter, DrawerTitle } from '@/core/components/drawer'
import { Image } from '@/core/components/image'
import { formatDigits } from '@/core/utils/string'
import { cn } from '@/lib/utils'
import { PokemonTypeBadges } from '@/pokemon-types/components/types'
import { getTypeColor } from '@/pokemon-types/utils/get-type'
import { routerTree } from '@/router.tree'

export interface PokemonItemProps {
  pokemonItem: PokemonTypeInfo
}

function replaceGenderSymbol(name: string) {
  return name.replace(/-F\b/i, ' ♀️').replace(/-M\b/i, ' ♂️')
}

export const PokemonItem = forwardRef<HTMLDivElement, PokemonItemProps>(function PokemonItem(
  { pokemonItem: pokemon },
  ref,
) {
  const [open, setOpen] = useState<boolean>(false)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const navigate = useNavigate()
  const mainColor = Color(getTypeColor(pokemon.types[0]))
  const secondaryColor = pokemon.types.length > 1 ? Color(getTypeColor(pokemon.types[1])) : mainColor
  const sound = useMemo(
    () => pokemon.cries?.split('/').slice(-2).join('/').split('.').slice(0, 1)?.[0],
    [pokemon.cries],
  )
  const crySoundPath = sound && `/assets/cries/${sound}.mp3`

  const pokemonColorStyle = {
    '--tw-bg-color': mainColor.hex(),
    '--tw-hover-bg-color': mainColor.darken(0.2).hex(),
    '--tw-bg-secondary-color': secondaryColor.hex(),
    '--tw-hover-bg-secondary-color': secondaryColor.darken(0.2).hex(),
  } as React.CSSProperties

  const onOpen = useCallback<MouseEventHandler>(() => setOpen(true), [])

  return (
    <>
      <Card
        key={pokemon.id}
        onClick={onOpen}
        ref={ref}
        className={cn(
          'pokemon-item hover:cursor-pointer shadow-md hover:shadow-lg opacity-100 transition-all duration-200 flex justify-between text-neutral-100 bg-pokemon-type-gradient',
          'flex-col md:flex-row',
          'md:hover:scale-110',
        )}
        style={pokemonColorStyle}
      >
        <CardHeader className='items-center md:items-start md:pr-0 order-2 md:order-1'>
          <CardTitle>
            <span className='capitalize'>
              <span className='text-neutral-100'>#{formatDigits(pokemon.id)}</span> {replaceGenderSymbol(pokemon.name)}
            </span>
          </CardTitle>
          <CardDescription className='flex flex-col text-sm gap-1'>
            <PokemonTypeBadges types={pokemon.types} />
            {crySoundPath && (
              <div className='-mx-4 my-2'>
                <AudioPlayer src={crySoundPath} mode='minimalist' audioProps={{ preload: 'none' }} />
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-10 pb-2 items-end relative flex-1 self-end bottom-2 order-1 md:order-2 w-full md:w-auto md:h-full min-h-40 h-fit md:min-h-0 max-h-40 md:max-h-full [&_img]:right-0 [&_img]:left-0 [&_img]:mx-auto [&>img]:-bottom-4'>
          {imageLoaded && (
            <img
              src='/assets/pokeball.png'
              alt='pokeball'
              className='absolute right-0 opacity-40 rotate-[30deg] bottom-0 w-40 h-40'
            />
          )}
          {pokemon.image && (
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              containerClassName='absolute bottom-0 right-0 justify-end'
              className='absolute bottom-0 right-0 scale-110 h-40 w-40'
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </CardContent>
      </Card>
      <Drawer onOpenChange={setOpen} open={open}>
        <DrawerContent
          className='min-h-[80vh] md:min-h-96 outline-none text-neutral-100 bg-[var(--tw-bg-color)] border-none bg-pokemon-type-gradient'
          style={pokemonColorStyle}
        >
          <DrawerTitle className='flex flex-col gap-4 justify-center items-center h-full mt-4'>
            <span className='flex gap-2'>
              <span className='text-3xl capitalize'>{replaceGenderSymbol(pokemon.name)}</span>
              <span className='text-xs mt-1'>#{formatDigits(pokemon.id)}</span>
            </span>
          </DrawerTitle>
          <div className='flex flex-col gap-4 justify-center items-center h-full mt-4'>
            {pokemon.image && <img src={pokemon.image} alt={pokemon.name} className='relative h-40' />}
            <PokemonTypeBadges types={pokemon.types} />
            {crySoundPath && <AudioPlayer src={crySoundPath} />}
          </div>
          <DrawerFooter className='flex'>
            <Button
              variant='ghost'
              className='w-fit self-center hover:bg-white/10 hover:text-neutral-100'
              onClick={() => navigate(routerTree.home.pokemons.details.replace(':id', pokemon.name))}
            >
              See {pokemon.name} details
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
})
