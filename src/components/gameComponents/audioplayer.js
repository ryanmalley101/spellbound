import React, {useState} from "react";
import ReactPlayer from "react-player";
// import "./AudioPlayer.css"; // Create a separate CSS file for styling

const AudioPlayer = ({song}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="audio-player-container">
      <ReactPlayer
        url={song.url}
        controls={true}
        playing={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        width="100%"
        height="50px"
        config={{
          // Customize control bar and button colors
          youtube: {
            playerVars: {controls: 1, modestbranding: 1, color: "red"},
          },
        }}
      />
    </div>
  );
};

export default AudioPlayer;
