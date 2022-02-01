import {
    HeartIcon,
    HomeIcon, LibraryIcon, LogoutIcon, PlusCircleIcon, SearchIcon, ViewBoardsIcon,
} from "@heroicons/react/outline"
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
    
    const spotifyAPI = useSpotify()
    const {data: session, status} = useSession()
    const [playlists, setPlaylists] = useState([])

    useEffect(()=>{
        if(spotifyAPI.getAccessToken()){
            spotifyAPI.getUserPlaylists().then(data=>{
                setPlaylists(data.body.items)
            })
        }
    },[session,spotifyAPI])

  return (
    <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen '>

        <div className="space-y-4">

            <button onClick={()=>signOut()} className="flex items-center space-x-2 hover:text-white">
                <LogoutIcon className="h-5 w-5"/>
                <p>Logout</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <HomeIcon className="h-5 w-5"/>
                <p>Home</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <SearchIcon className="h-5 w-5"/>
                <p>Your Library</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <LibraryIcon className="h-5 w-5"/>
                <p>Library</p>
            </button>

            <hr className="border-t-[0.1px] border-gray-900" />

            <button className="flex items-center space-x-2 hover:text-white">
                <PlusCircleIcon className="h-5 w-5"/>
                <p>Create Playlist</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <HeartIcon className="h-5 w-5"/>
                <p>Liked Songs</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <ViewBoardsIcon className="h-5 w-5"/>
                <p>Your Playlists</p>
            </button>

            <hr className="border-t-[0.1px] border-gray-900" />

            {/* playlists */}
            {playlists.map(playlist => (
                <p key={playlist.id} className="cursor-pointer hover:text-white">{playlist.name}</p>
            ))}

        </div>
    
    </div>
  );
}

export default Sidebar;
