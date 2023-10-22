import React, {useEffect, useRef, useState} from "react";
import useBattlemapStore from "@/stores/battlemapStore";
import {API} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {BsFillPlayFill} from "@react-icons/all-files/bs/BsFillPlayFill";
import {BsPauseFill} from "@react-icons/all-files/bs/BsPauseFill";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css'
import H5AudioPlayer from "react-h5-audio-player";
// import "./AudioPlayer.css"; // Create a separate CSS file for styling

const GameAudio = ({songUrl}) => {
    const [volume, setVolume] = useState(.5)
    const [isPlaying, setIsPlaying] = useState(false)
    const [looping, isLooping] = useState(false)
    const {playingSong, gameID, isSongPlaying, songQueue, setSongQueue, playerIsDM} = useBattlemapStore();
    const audioRef = useRef(null);

    const handlePlay = async (e) => {
        console.log(e)
        if (!isPlaying) {
            console.log("Playing song")
            setIsPlaying(true)
            const play = {
                id: gameID,
                songPlaying: true,
                paused: false
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
                songPlaying: false,
                paused: true
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

    const handleNext = async (e) => {
        e.preventDefault()
        console.log("Playing next song", e)
        if (songQueue.length > 1) {
            const newQueue = [...songQueue]
            newQueue.shift()
            try {
                const newSongDetails = {
                    id: gameID,
                    songQueue: newQueue.map((song) => {
                        delete song.__typename
                        return song
                    }),
                    activeSong: {title: songQueue[0].title, url: songQueue[0].url},
                    songPlaying: true,
                    paused: false
                };

                console.log(newSongDetails)

                const updatedGame = await API.graphql({
                    query: mutations.updateGame,
                    variables: {input: newSongDetails}
                });
            } catch (error) {
                console.error("Error updating game:", error);
            }
        } else if (looping) {
            try {
                const newSongDetails = {
                    id: gameID,
                    songQueue: [{name: playingSong, url: playingSong}],
                    activeSong: {title: songQueue[0].title, url: songQueue[0].url},
                    songPlaying: true,
                    paused: false
                };

                const updatedGame = await API.graphql({
                    query: mutations.updateGame,
                    variables: {input: newSongDetails}
                });
            } catch (error) {
                console.error("Error updating game:", error);
            }

        } else {
            const pause = {
                id: gameID,
                songPlaying: false,
                paused: false,
                activeSong: {title: songQueue[0].title, url: songQueue[0].url},
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
    }

    const handleBack = async (e) => {
        try {
            const newSongDetails = {
                id: gameID,
                activeSong: {title: songQueue[0].title, url: songQueue[0].url},
                songPlaying: true,
                paused: false
            };

            const updatedGame = await API.graphql({
                query: mutations.updateGame,
                variables: {input: newSongDetails}
            });
        } catch (error) {
            console.error("Error updating game:", error);
        }
    }

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
            if (isSongPlaying && audioRef.current.paused) {
                audioRef.current.play();
            } else if (!isSongPlaying && !audioRef.current.paused) {
                audioRef.current.pause();
            }
        }
    }, [isSongPlaying, audioRef]);

    if (playingSong) {
        return (
            <div style={{width: "100%"}}
            >
                <AudioPlayer src={playingSong} onPlay={handlePlay} onPause={handlePause} customAdditionalControls={[]}
                             onVolumeChange={handleVolumeChange} onClickNext={handleNext} onClickPrevious={handleBack}
                             autoPlayAfterSrcChange={true} showJumpControls={false} showSkipControls={true}
                             customControlsSection={playerIsDM ? [RHAP_UI.ADDITIONAL_CONTROLS, RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS]
                                 : [RHAP_UI.VOLUME_CONTROLS]}/>
            </div>
        );
    }
};

export default GameAudio;
