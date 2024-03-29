import { useRecoilState } from "recoil"
import { currentTrackIDState, isPlayingState } from "../atoms/songAtom"
import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time"

function Song({order, track}) {

    const spotifyAPI= useSpotify()
    const [currentTrackID, setCurrentTrackID] = useRecoilState(currentTrackIDState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    const playSong = () => {
        setCurrentTrackID(track.track.id)
        setIsPlaying(true)
        spotifyAPI.play({
            uris: [track.track.uri],
        })
    }

    return (
        <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={playSong}>
            <div className="flex items-center space-x-4">
                <p>{order+1}</p>
                <img className="h-10 w-10" src={track.track.album.images[0].url} />
                <div>
                    <p className="w-46 truncate lg:w-64 text-white">{track.track.name}</p>
                    <p className="w-40">{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline">{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
