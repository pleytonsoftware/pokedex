import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

export interface ChildrenWithClassName extends PropsWithChildren {
  className?: string
}

export function TypographyH1({ className, children }: ChildrenWithClassName) {
  return <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>{children}</h1>
}

export function TypographyH2({ className, children }: ChildrenWithClassName) {
  return (
    <h2 className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}>
      {children}
    </h2>
  )
}

export function TypographyH3({ className, children }: ChildrenWithClassName) {
  return <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>
}
