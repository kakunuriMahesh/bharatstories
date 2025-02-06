import React from 'react'
import { useParams } from 'react-router-dom'

const NotFound = () => {
    const notFound = useParams()
    console.log(notFound)
  return (
    <div className='flex flex-col gap-3 h-[100vh] w-full items-center justify-center'>
        <h1>"{notFound.any}"</h1>
        <h1> Not Found</h1>
    </div>
  )
}

export default NotFound