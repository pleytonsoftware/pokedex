import { useEffect } from 'react'
import { useParams } from 'react-router'

import Color from 'color'

import { Image } from '@/core/components/image'
import { useLayoutContext } from '@/core/hooks/layout-context'
import { getTypeColor } from '@/pokemon-types/utils/get-type'
import { useGetPokemon } from '@/pokemon/hooks/use-get-pokemon'

import NotFoundPage from './NotFound'

const PokemonDetailsPage = () => {
  const { id } = useParams()
  const { updatePadding } = useLayoutContext()

  const { data, isFetched } = useGetPokemon(id || '', {
    enabled: Boolean(id),
  })

  useEffect(() => {
    updatePadding(false)
    return () => updatePadding(true)
  }, [updatePadding])

  if (!id || (isFetched && !data)) {
    return <NotFoundPage />
  }

  const src =
    data?.sprites.other?.dream_world.front_default ||
    data?.sprites.other?.home.front_default ||
    data?.sprites.front_default

  if (!data) {
    return <NotFoundPage />
  }

  const mainColor = Color(getTypeColor(data.types[0].type.name))
  const secondaryColor = data.types.length > 1 ? Color(getTypeColor(data.types[1].type.name)) : null
  const pokemonColorStyle = {
    '--tw-bg-color': mainColor.hex(),
    '--tw-hover-bg-color': mainColor.darken(0.2).hex(),
    ...(secondaryColor && {
      '--tw-bg-secondary-color': secondaryColor.hex(),
      '--tw-hover-bg-secondary-color': secondaryColor.darken(0.2).hex(),
    }),
  } as React.CSSProperties

  return (
    <div className='flex w-full bg-pokemon-type-gradient-135' style={pokemonColorStyle}>
      <div className='flex w-1/2'>{data.name}</div>
      <div className='relative flex-1 h-[calc(100dvh-4rem)]'>
        {src && <Image src={src} alt={data.name} className='w-full object-contain' containerClassName='items-end' />}
        {/* <div
          className='absolute bottom-0 right-0 -z-[1] w-full h-full bg-[var(--tw-bg-color)]'
          style={{
            clipPath: 'polygon(100% 0%, 100% 0, 100% 100%, 5px 100%)',
          }}
        ></div> */}
      </div>
    </div>
  )
}

export default PokemonDetailsPage

// width: 100%;
//     height: 100%;
//     clip-path: polygon(100% 0%, 100% 0, 100% 100%, 5px calc(105% + 5px));
//     background: red;
//     z-index: -1;
