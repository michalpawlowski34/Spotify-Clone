import { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIDState } from "../atoms/songAtom"
import useSpotify from "./useSpotify"

function useSongInfo() {

    const spotifyAPI = useSpotify()
    const [currentTrackID, setCurrentTrackID] = useRecoilState(currentTrackIDState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(()=>{
        const fetchSongInfo = async () => {
            if(currentTrackID) {
                const trackInfo = await fetch(
                   `https://api.spotify.com/v1/tracks/${currentTrackID}`, 
                   {
                        headers: {
                            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`
                        }
                   }
                ).then(res => res.json())

                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo()
    }, [currentTrackID, spotifyAPI])

    return songInfo;
}

export default useSongInfo
