import React from 'react'
import {Link} from 'react-router-dom'
const Hero = () => {
  return ( 
        <div className=' md:h-[84.3vh] flex flex-col md:flex-row items-center justify-center'>
            <div className='w-full mb-12 md:mb-5 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
                <h1 className='text-4xl lg:text-5xl font-semibold text-yellow-100 text-center lg:text-left'>Discover Your Next Great Read</h1>
                <p className='mt-4 text-2xl text-zinc-300 text-center lg:text-left'>Uncover captivating stories, enriching knowledge, and endless
                    inspiration in our curated collection of books
                </p>
                <div className='mt-8'>
                    <Link to={"/All-books"} className='text-yellow-100 text-2xl font-semibold border border-yello-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Discover Books</Link>
                </div>
            </div>
            <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
                <img src="./final.png" alt="logo" />
            </div>
        </div>
    )
}

export default Hero