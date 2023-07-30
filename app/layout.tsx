import { useState } from 'react'
import Navbar from './auth/Navbar'
import QueryWrapper from './auth/QueryWrapper'
import './globals.css'
import { ToolsContext } from './providers/ToolsProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
          <QueryWrapper>
            <Navbar/>
            {children}
          </QueryWrapper>
      </body>
    </html>
  )
}
