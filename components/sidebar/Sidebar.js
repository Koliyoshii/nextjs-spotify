import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";

import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylist] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  
  return (
    <div className="text-gray-500 p-5 text-2xl md:text-xs border-r-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] md:inline-flex hidden pb-28">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white "
          onClick={() => signOut()}
        >
          <p>Log out</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <HomeIcon className="h-5 w-5 text-gray-700" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <BuildingLibraryIcon className="h-5 w-5 text-gray-700" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white ">
          <PlusCircleIcon className="h-5 w-5 text-gray-700" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <HeartIcon className="h-5 w-5 text-gray-700" />
          <p>Liked songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <RssIcon className="h-5 w-5 text-gray-700" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
