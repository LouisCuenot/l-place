'use client'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient()

const QueryWrapper = (props:{children:ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
  )
}

export default QueryWrapper