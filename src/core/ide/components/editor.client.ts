'use client'

import dynamic from 'next/dynamic'

export const IDEEditor = dynamic(() => import('./editor').then((mod) => mod.IDEEditor), {
  ssr: false,
})
