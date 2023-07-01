import React, {useState} from "react";
import ReactPlayer from "react-player";

const AudioPlayer = ({song}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <ReactPlayer
        url={song.url}
        controls={true}
        onPlay={handlePlay}
        onPause={handlePause}
      />
    </div>
  );
};

export default AudioPlayer;