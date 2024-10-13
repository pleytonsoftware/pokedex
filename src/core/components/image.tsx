import { type ImgHTMLAttributes, ReactEventHandler, forwardRef, useCallback, useMemo, useState } from 'react'

import { useDebounceValue } from 'usehooks-ts'

import { cn } from '@/lib/utils'

interface ImageLoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string
}

export const Image = forwardRef<HTMLImageElement, ImageLoaderProps>(function Image(
  { containerClassName, onLoad, ...props },
  ref,
) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [deferredLoaded, setDeferredLoaded] = useDebounceValue<boolean>(isLoading, 300)

  const handleImageLoad = useCallback<ReactEventHandler<HTMLImageElement>>(
    (evt) => {
      setIsLoading(false)
      setDeferredLoaded(false)
      onLoad?.(evt)
    },
    [onLoad, setDeferredLoaded],
  )

  const randomAnimationSpeed = useMemo(() => `${Math.floor(Math.random() * 1500) + 1000}ms`, [])

  return (
    <div className={cn('flex justify-center items-center w-full h-full', containerClassName)}>
      {deferredLoaded && (
        <img
          src='/assets/pokeball.png'
          alt='pokeball'
          className={cn('w-20 h-20 animate-spin transition-opacity opacity-0', isLoading && 'opacity-100')}
          style={{ animationDuration: randomAnimationSpeed }}
        />
      )}
      <img
        ref={ref}
        onLoad={handleImageLoad}
        className={cn(
          'transition-opacity duration-300 w-full h-full object-cover opacity-100',
          isLoading && 'opacity-0',
        )}
        {...props}
      />
    </div>
  )
})
