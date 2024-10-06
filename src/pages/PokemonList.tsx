import { useTranslation } from 'react-i18next'

import { TypographyH2 } from '@/core/components/typography'
import { PokemonList } from '@/pokemon/components/pokemon-list'
import Pokeball from '@assets/pokeball.svg?react'

const PokemonListPage = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <span className='text-center'>
        <TypographyH2 className='py-2'>
          <Pokeball className='w-8 h-8 inline-flex mr-2' />
          {t('welcome')}
          <Pokeball className='w-8 h-8 inline-flex ml-2' />
        </TypographyH2>
      </span>
      <PokemonList />
    </>
  )
}

export default PokemonListPage
