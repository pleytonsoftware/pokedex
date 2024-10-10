import type { FC } from 'react'

import { Link } from 'react-router-dom'

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
    to: '/pokemons',
  },
]

export const DashboardPage: FC = () => {
  return (
    <div className='flex flex-col w-screen h-screen max-w-screen-lg mx-auto justify-center items-center'>
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
