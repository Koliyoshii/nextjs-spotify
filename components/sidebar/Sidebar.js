import React from 'react'

import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, HeartIcon, RssIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  return (
    <div className='text-gray-500 p-5 text-sm border-r-gray-900'>
        <div className='space-y-4'>
            <button className='flex items-center space-x-2 hover:text-white '>
                <HomeIcon className="h-5 w-5 text-gray-700"/>
                <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white '>
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-700"/>
                <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white '>
                <BuildingLibraryIcon className="h-5 w-5 text-gray-700"/>
                <p>Your Library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>

            <button className='flex items-center space-x-2 hover:text-white '>
                <PlusCircleIcon className="h-5 w-5 text-gray-700"/>
                <p>Create Playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white '>
                <HeartIcon className="h-5 w-5 text-gray-700"/>
                <p>Liked songs</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white '>
                <RssIcon className="h-5 w-5 text-gray-700"/>
                <p>Your episodes</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>

            {/* Playlists */}

            <p className='cursor-pointer hover:text-white'>Playlist 1</p>
            <p className='cursor-pointer hover:text-white'>Playlist 2</p>
            <p className='cursor-pointer hover:text-white'>Playlist 3</p>
            <p className='cursor-pointer hover:text-white'>Playlist 4</p>
            <p className='cursor-pointer hover:text-white'>Playlist 5</p>
            <p className='cursor-pointer hover:text-white'>Playlist 6</p>
        </div>
    </div>
  )
}

export default Sidebar