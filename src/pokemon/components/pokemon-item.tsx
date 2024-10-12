import type { PokemonTypeInfo } from '../hooks/use-list-pokemon'

import { MouseEventHandler, forwardRef, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import Color from 'color'

import { AudioPlayer } from '@/core/components/audio-player'
import { Button } from '@/core/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card'
import { Drawer, DrawerContent, DrawerFooter } from '@/core/components/drawer'
import { Image } from '@/core/components/image'
import { formatDigits } from '@/core/utils/string'
import { PokemonTypeBadges } from '@/pokemon-types/components/types'
import { getTypeColor } from '@/pokemon-types/utils/get-type'

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

  const pokemonColorStyle = {
    '--tw-bg-color': mainColor.hex(),
    '--tw-hover-bg-color': mainColor.darken(0.2).hex(),
  } as React.CSSProperties

  const onOpen = useCallback<MouseEventHandler>(() => setOpen(true), [])

  return (
    <>
      <Card
        key={pokemon.id}
        onClick={onOpen}
        ref={ref}
        className='pokemon-item hover:cursor-pointer shadow-md hover:shadow-lg opacity-100 min-h-16 transition-all duration-200 flex justify-between bg-[var(--tw-bg-color)] hover:bg-[var(--tw-hover-bg-color)] text-neutral-100 hover:scale-105 md:hover:scale-110'
        style={pokemonColorStyle}
      >
        <CardHeader className='items-start pr-0'>
          <CardTitle>
            <span className='capitalize'>
              <span className='text-neutral-100'>#{formatDigits(pokemon.id)}</span> {replaceGenderSymbol(pokemon.name)}
            </span>
          </CardTitle>
          <CardDescription className='flex flex-col text-sm gap-1'>
            <PokemonTypeBadges types={pokemon.types} />
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-10 pb-2 items-end relative h-full flex-1 self-end bottom-2'>
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
              containerClassName='absolute bottom-0 right-0'
              className='absolute bottom-0 right-0 scale-110 h-40 w-40'
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </CardContent>
      </Card>
      <Drawer onOpenChange={setOpen} open={open}>
        <DrawerContent
          className='min-h-[80vh] md:min-h-96 outline-none text-neutral-100 bg-[var(--tw-bg-color)] border-[var(--tw-bg-color)]'
          style={pokemonColorStyle}
        >
          <div className='flex flex-col gap-4 justify-center items-center h-full'>
            <span className='flex gap-2'>
              <span className='text-3xl capitalize'>{replaceGenderSymbol(pokemon.name)}</span>
              <span className='text-xs mt-1'>#{formatDigits(pokemon.id)}</span>
            </span>
            {pokemon.image && <img src={pokemon.image} alt={pokemon.name} className='relative h-40' />}
            <PokemonTypeBadges types={pokemon.types} />
            {pokemon.cries && <AudioPlayer src={pokemon.cries} />}
          </div>
          <DrawerFooter className='flex'>
            <Button
              variant='ghost'
              className='w-fit self-center hover:bg-white/10 hover:text-neutral-100'
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            >
              See {pokemon.name} details
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
})
