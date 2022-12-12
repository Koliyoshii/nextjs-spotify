import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        );

        if (!response.ok) {
            throw new Error("Something went wrong.")
        }
        const trackInfo = await response.json();
          
        setSongInfo(trackInfo);
      }
    };

    try {
        fetchSongInfo();
    } catch (error) {
        console.log(error);
    }
    
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
