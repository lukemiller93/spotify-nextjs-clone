import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";


const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
]

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null)
  const spotifyApi = useSpotify()
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const [playlist,setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)])

  }, [playlistId])

  useEffect(() => {
    console.log(spotifyApi)
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body)
    }).catch(err => console.log(`Something went wrong ${err}`))
  }, [playlistId, spotifyApi])

  return (
    <div className="flex-grow ">
      <header className="absolute top-5 right-8">
        <div className="flex bg-red-400 items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt={session?.user?.name}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex ${color} items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8`}
      >
        <img className="w-44 h-44 shadow-2xl" src={playlist?.images?.[0]?.url} />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>
    </div>
  );
}

export default Center;
