'use client'

import { type AudioHTMLAttributes, type FC, type MouseEventHandler, useEffect, useRef, useState } from 'react'

import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Slider } from './slider'

export interface AudioPlayerProps {
  src: string
  mode?: 'minimalist' | 'full'
  sliderProgressBar?: boolean
  withVolume?: boolean
  audioProps?: AudioHTMLAttributes<HTMLAudioElement>
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  src,
  mode = 'full',
  sliderProgressBar = false,
  withVolume = false,
  audioProps,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useLocalStorage('volume', 1)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    const setAudioData = () => {
      setDuration(audio.duration)
      setAudioTime()
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      if (audio) {
        audio.currentTime = 0
      }
    }

    // Events
    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.addEventListener('ended', handleEnded)

    // Cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay: MouseEventHandler = (evt) => {
    evt.stopPropagation()
    if (audioRef.current?.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }

  const handleProgressChange = (newValue: number[]) => {
    const [value] = newValue
    const newTime = (value / 100) * duration
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (newValue: number[]) => {
    const [value] = newValue
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
    setIsMuted(value === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const isMinimalist = mode === 'minimalist'
  const shouldShowVolume = !isMinimalist && withVolume
  const PlayPause = isPlaying ? Pause : Play
  const Volume = shouldShowVolume ? (isMuted ? VolumeX : Volume2) : null

  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto text-neutral-100 p-4 rounded-lg bg-transparent',
        isMinimalist && 'flex justify-center',
      )}
    >
      <audio autoPlay={false} preload='none' {...audioProps} ref={audioRef}>
        <source src={src} type='audio/mp3' />
      </audio>
      <div className={cn('flex items-center justify-between mb-4 gap-2', isMinimalist && 'justify-center')}>
        <Button
          variant='ghost'
          size='icon'
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className='hover:bg-white/30 text-neutral-100 hover:text-neutral-100'
        >
          <PlayPause className='icon' />
        </Button>
        {!isMinimalist && (
          <div className='text-sm font-medium'>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        )}
      </div>
      {!isMinimalist &&
        (sliderProgressBar ? (
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={handleProgressChange}
            className='mb-4 transition-all'
            aria-label='Audio progress'
          />
        ) : (
          <div className='relative mb-8'>
            <div
              className='absolute left-0 top-1/2 h-1 bg-neutral-100 transition-all duration-200 rounded-full translate-y-1/2'
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <div className='absolute left-0 top-1/2 w-full h-1 bg-neutral-100/20 rounded-full translate-y-1/2' />
          </div>
        ))}

      {shouldShowVolume && (
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
            {Volume && <Volume className='icon' />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className='w-24 ml-2'
            aria-label='Volume'
          />
        </div>
      )}
    </div>
  )
}
