import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

export const MobileActionButton: FC<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> = ({ ...props }) => {
  return (
    <button
      className='flex-auto flex flex-col gap-1 items-center py-6 text-red-500 font-semi [&>span]:text-xs'
      {...props}
    />
  )
}
