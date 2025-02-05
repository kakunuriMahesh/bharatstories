import React from 'react'

const Footer = () => {
  return (
    <div className="p-[30px] text-white bg-[#b00000]">
        <div className="flex md:flex-row md:items-start md:gap-[20px] flex-col items-center gap-3">
            <div className='flex flex-col md:items-start items-center'>
                <h2 className='font-bold'>Stories</h2>
                <ul className='flex flex-col md:items-start items-center'>
                    <li><a href="#">Krishna</a></li>
                    <li><a href="#">MahaBharatha</a></li>
                    <li><a href="#">Bhagavath Geetha</a></li>
                    <li><a href="#">Ramayana</a></li>
                </ul>
            </div>
            <div className='flex flex-col md:items-start items-center'>
                <h2 className='font-bold'>Resources</h2>
                <ul className='flex flex-col md:items-start items-center'>
                    <li><a href="#">archive.org</a></li>

                </ul>
            </div>
            <div className='flex flex-col md:items-start items-center'>
                <h2 className='font-bold'>Contact</h2>
                <ul className='flex flex-col md:items-start items-center'>
                    <li><a href="#">Email</a></li>
                    <li><a href="#">Phone</a></li>
                </ul>
            </div>
        </div>
        <div className='flex justify-center gap-4'>
            <p>Copyright 2025</p>
            <a href="#" >SRC Designs</a>
        </div>
    </div>
  )
}

export default Footer