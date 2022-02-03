import { RefreshIcon, SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon, } from "@heroicons/react/outline"
import { RewindIcon, PauseIcon, PlayIcon, FastForwardIcon, VolumeUpIcon } from "@heroicons/react/solid"
import { debounce } from "lodash"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIDState, isPlayingState } from "../atoms/songAtom"
import useSongInfo from "../hooks/useSongInfo"
import useSpotify from "../hooks/useSpotify"

function Player() {

    const spotifyAPI = useSpotify()
    const { data: session, status} = useSession()
    const [currentTrackID, setCurrentTrackID] = useRecoilState(currentTrackIDState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)
    const songInfo = useSongInfo()
    console.log(`volume`, volume)

    const fetchCurrentSong = () => {
        if(!songInfo) { 
            spotifyAPI.getMyCurrentPlayingTrack().then(data=>{
                setCurrentTrackID(data.body?.item.id)
                spotifyAPI.getMyCurrentPlaybackState().then(data=>{
                    console.log(`Now playing`, data.body)
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    const handlePlayPause = () =>{
        spotifyAPI.getMyCurrentPlaybackState().then(data=>{
            if(data.body.is_playing) {
                spotifyAPI.pause()
                setIsPlaying(false)
            }
            else{
                spotifyAPI.play()
                setIsPlaying(true)
            }
        })
    }

    useEffect(()=> {
        if(spotifyAPI.getAccessToken() && !currentTrackID){
            fetchCurrentSong()
            setVolume(50)
        }
    },[currentTrackID, spotifyAPI, session])

    useEffect(()=>{
        debouncedAdjustVolume(volume)
    },[volume])

    const debouncedAdjustVolume = useCallback(
       debounce((volume)=>{

           spotifyAPI.setVolume(volume).catch(err=>{})
       },300, []) 
    )

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt=""/>
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            {/* center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button"/>
                <RewindIcon className="button" />
                {isPlaying ? (<PauseIcon onClick={handlePlayPause} className="button w-10 h-10"/>) : (<PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />)}
                <FastForwardIcon className="button" onClick={()=>spotifyAPI.skipToNext()}/>
                <RefreshIcon className="button" />
            </div>

            {/* right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end">
                <VolumeDownIcon onClick={()=>volume-10>0 ? setVolume(volume-10) : setVolume(0)} className="button"/>
                <input 
                    className="w-14 md:w-20" 
                    type='range' 
                    value={volume} 
                    min={0} 
                    max={100} 
                    step={1} 
                    onChange={e=>setVolume(Number(e.target.value))}
                />
                <VolumeUpIcon onClick={()=>volume+10<100 ? setVolume(volume+10) : setVolume(100)} className="button"/>
            </div>
        </div>
    )
}

export default Player
