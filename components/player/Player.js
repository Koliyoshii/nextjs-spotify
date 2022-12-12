import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import useSongInfo from "../../hooks/useSongInfo";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import { isOnlyAccessibleToPremium } from "../../atoms/errorModalAtom";
import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { debounce } from "lodash";
import Image from "next/image";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [showModalPremiumError, setIsOnlyAccessibleToPremium] = useRecoilState(
    isOnlyAccessibleToPremium
  );

  const songInfo = useSongInfo();

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (!data.body) {
        setIsPlaying(!isPlaying);
        setIsOnlyAccessibleToPremium(true);
      } else {
        if (data.body.is_playing) {
          spotifyApi.pause();
          setIsOnlyAccessibleToPremium(false);
        } else {
          spotifyApi.play();
          setIsOnlyAccessibleToPremium(false);
          setIsPlaying(true);
        }
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      function fetchCurrentSong() {
        if (!songInfo) {
          spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            setCurrentTrackId(data.body?.item?.id);
            spotifyApi.getMyCurrentPlaybackState().then((data) => {
              setIsPlaying(data.body?.is_playing);
            });
          });
        }
      }
      fetchCurrentSong();
      setVolume(50);
    }
  }, [spotifyApi, currentTrackId, songInfo, setCurrentTrackId, setIsPlaying]);

  const debouncedAdjustVolume = useCallback(
    () => debounce((volume) => () => {
      spotifyApi.setVolume(volume).catch((error) => {
        console.log(error);
        setIsOnlyAccessibleToPremium(true);
      });
      setIsOnlyAccessibleToPremium(false);
    },10000),
    /* debounce((volume) => {
      spotifyApi.setVolume(volume).catch((error) => {
        console.log(error);
        setIsOnlyAccessibleToPremium(true);
      });
      setIsOnlyAccessibleToPremium(false);
    }, 500), */
    [spotifyApi, setIsOnlyAccessibleToPremium]
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume, debouncedAdjustVolume]);
  console.log(songInfo);

  return (
    <div className=" opacity-90 h-24 bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        {!songInfo?.album?.images[0]?.url && (
          <div className="flex items-center space-x-4">
            <Image
              className="hidden md:inline h-10 w-10"
              src={"/images/spotify-logo.png"}
              alt="Album cover Spotify Logo"
              width={100}
              height={100}
            />
            <div>
              <h3 className=" font-semibold">Song Name</h3>
              <p>Song Artis</p>
            </div>
          </div>
        )}
        {songInfo?.album?.images[1]?.url && (
          <Image
            className="hidden md:inline h-10 w-10"
            src={songInfo?.album?.images[0]?.url}
            alt={""}
            width={100}
            height={100}
          />
        )}
        <div>
          <h3 className=" font-semibold">{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-evenly">
        <ArrowsRightLeftIcon className="player-button" />
        <BackwardIcon className="player-button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="player-button" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="player-button" />
        )}
        <ForwardIcon className="player-button" />
        <ArrowPathIcon className="player-button" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <SpeakerWaveIcon
          className="player-button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          className="w-14 md:w-28 bg-gray-200  h-[2px] rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <SpeakerWaveIcon
          className="player-button"
          onClick={() =>
            volume < 100 && setVolume(volume + 10)
          }
        />
      </div>
    </div>
  );
}

export default Player;
