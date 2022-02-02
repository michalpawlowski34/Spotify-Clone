import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
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

    const fetchCurrentSong = () => {
        if(!songInfo) { 
            spotifyAPI.getMyCurrentPlayingTrack().then(data=>{
                setCurrentTrackID(data.body.item.id)
                spotifyAPI.getMyCurrentPlaybackState().then(data=>{
                    console.log(`Now playing`, data.body)
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    useEffect(()=> {
        if(spotifyAPI.getAccessToken() && !currentTrackID){
            fetchCurrentSong()
            setVolume(50)
        }
    },[currentTrackID, spotifyAPI, session])

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white">
            {/* left */}
            <div>
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt=""/>
            </div>
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>
    )
}

export default Player
