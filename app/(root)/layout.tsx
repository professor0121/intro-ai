import React from 'react'
import Header from '@/components/Header'

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="root-layout">
        <Header/>
        {children}</div>
  )
}

export default RootLayout