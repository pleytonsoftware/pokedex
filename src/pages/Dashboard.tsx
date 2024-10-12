import type { FC } from 'react'

import { Link } from 'react-router-dom'

import { routerTree } from '@/router.tree'

interface DashboardItemProps {
  title: string
  to: string
}

const DashboardItem: FC<DashboardItemProps> = ({ to, title }) => {
  return (
    <Link to={to} className='min-w-32'>
      {/* <MiniCardItem className='text-foreground md:hover:scale-105' title={title} displayContent={false} /> */}
      {title}
    </Link>
  )
}

const items: DashboardItemProps[] = [
  {
    title: 'Pokemon List',
    to: routerTree.home.pokemons.index,
  },
]

export const DashboardPage: FC = () => {
  return (
    <div className='flex flex-col w-screen h-screen max-w-screen-lg mx-auto justify-center items-center'>
      <h1 className='text-3xl font-bold font-pokemon-solid text-yellow-300 text-shadow-slate-900'>PokePleyt</h1>
      {items.map((item, index) => {
        const rendered = <DashboardItem key={index} title={item.title} to={item.to} />

        return index % 2 === 0 ? (
          <div className='flex gap-4 p-4 w-full justify-center items-center'>{rendered}</div>
        ) : (
          rendered
        )
      })}
    </div>
  )
}
