import { Play, Pause } from "./Player";
import { usePlayerStore } from "../store/playerStore";

export function CardPlayButton({ id }) {
  const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying } =
    usePlayerStore((state) => state);
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;
  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);

        setCurrentMusic({ songs, playlist, song: songs[0] });
      });
  };

  return (
    <button
      className="card-play-button p-2 rounded-full bg-green-500 mt-4 "
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
