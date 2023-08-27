import React, {useEffect, useState} from "react";
import ReactAudioPlayer from 'react-audio-player';
import useBattlemapStore from "@/stores/battlemapStore";
// import "./AudioPlayer.css"; // Create a separate CSS file for styling

const AudioPlayer = ({songUrl}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const {playingSong} = useBattlemapStore();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    console.log("Playing ", songUrl)
  }, [songUrl])

  return (
    <div className="audio-player-container" style={{width: "100%"}}>
      <ReactAudioPlayer
        src={playingSong}
        autoPlay
        controls
      />
    </div>
  );
};

export default AudioPlayer;
