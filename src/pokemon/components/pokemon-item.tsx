import type { PokemonTypeInfo } from '../hooks/use-list-pokemon'

import { forwardRef, useEffect, useState } from 'react'

import Color from 'color'
import { PlayIcon } from 'lucide-react'
import useSound from 'use-sound'

import { Button } from '@/core/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card'
import { Drawer, DrawerContent } from '@/core/components/drawer'
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
  const [play, { stop }] = useSound(pokemon.cries || [], { volume: 0.5 })
  const mainColor = Color(getTypeColor(pokemon.types[0]))

  const pokemonColorStyle = {
    '--tw-bg-color': mainColor.hex(),
    '--tw-hover-bg-color': mainColor.darken(0.2).hex(),
  } as React.CSSProperties

  useEffect(() => {
    if (!open) stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <>
      <Card
        key={pokemon.id}
        onClick={() => setOpen(true)}
        ref={ref}
        className='pokemon-item hover:cursor-pointer shadow-md hover:shadow-lg opacity-100 min-h-16 transition-all duration-200 flex justify-between bg-[var(--tw-bg-color)] hover:bg-[var(--tw-hover-bg-color)] text-neutral-100 hover:scale-105 md:hover:scale-110'
        style={pokemonColorStyle}
      >
        <CardHeader className='items-start pr-0'>
          <CardTitle>
            {' '}
            <span className='capitalize'>
              <span className='text-neutral-100'>#{formatDigits(pokemon.id)}</span> {replaceGenderSymbol(pokemon.name)}
            </span>
          </CardTitle>
          <CardDescription className='flex flex-col text-sm gap-1'>
            <PokemonTypeBadges types={pokemon.types} />
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-10 pb-2 items-end relative h-fit self-end bottom-2'>
          <img
            src='/assets/pokeball.png'
            alt='pokeball'
            className='absolute w-4/5 h-4/5 bottom-0 right-3 opacity-40 rotate-[10deg]'
          />
          {pokemon.image && <img src={pokemon.image} alt={pokemon.name} className='relative' />}
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
            {pokemon.cries && (
              <Button variant='ghost' onClick={() => play()} className='hover:bg-white/20 hover:text-neutral-100'>
                <PlayIcon className='w-4 h-4' />
              </Button>
            )}
          </div>
          {/* <DrawerFooter>
          // TODO open details button here
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  )
})
