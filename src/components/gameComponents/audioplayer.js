import React, {useEffect, useRef, useState} from "react";
import ReactAudioPlayer from 'react-audio-player';
import useBattlemapStore from "@/stores/battlemapStore";
import {API} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
// import "./AudioPlayer.css"; // Create a separate CSS file for styling

const AudioPlayer = ({songUrl}) => {
  const [volume, setVolume] = useState(.5)
  const [isPlaying, setIsPlaying] = useState(false)
  const {playingSong, gameID, isSongPlaying} = useBattlemapStore();
  const audioRef = useRef(null);

  const handlePlay = async (e) => {
    if (!isPlaying) {
      console.log("Playing song")
      setIsPlaying(true)
      const play = {
        id: gameID,
        songPlaying: true
      }

      try {
        const updatedGame = await API.graphql({
          query: mutations.updateGame,
          variables: {input: play},
        });
        console.log(updatedGame);

        return updatedGame;
      } catch (error) {
        console.error("Error updating game:", error);
      }
    }
  }

  const handlePause = async (e) => {
    if (isPlaying) {
      console.log("Pausing Song")
      setIsPlaying(false)
      const pause = {
        id: gameID,
        songPlaying: false
      }

      try {
        // Call the updateGame mutation
        const updatedGame = await API.graphql({
          query: mutations.updateGame,
          variables: {input: pause},
        });
        console.log(updatedGame);

        return updatedGame;
      } catch (error) {
        console.error("Error updating game:", error);
      }
    }

  };

  const handleVolumeChange = (e) => {
    console.log(e)
    setVolume(e.target.volume)
  }

  useEffect(() => {
    console.log("Playing ", playingSong)
  }, [songUrl])

  useEffect(() => {
    // Access the audio element and control playback based on isSongPlaying
    if (audioRef.current) {
      console.log(audioRef.current)
      audioRef.current.volume = volume
      if (isSongPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isSongPlaying, audioRef]);

  if (playingSong) {
    return (
      <div className="audio-player-container" style={{width: "100%"}}
      >

        <audio ref={audioRef} src={playingSong} controls autoPlay
               onVolumeChange={handleVolumeChange}
               onPause={handlePause}
               onPlay={handlePlay}/>

        {/*<ReactAudioPlayer*/}
        {/*  ref={(element) => {*/}
        {/*    audioRef.current = element*/}
        {/*  }}*/}
        {/*  src={playingSong}*/}
        {/*  autoPlay={false}*/}
        {/*  controls*/}

        {/*/>*/}
      </div>
    );
  }
};

export default AudioPlayer;
