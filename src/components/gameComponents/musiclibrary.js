import React, {useEffect, useState} from "react";
import styles from "@/styles/MusicLibrary.module.css";
import playlists from "../../../public/playlists.json"
import {API} from "aws-amplify";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {BsFillCaretDownFill, BsFillCaretRightFill, BsFillPlayFill} from "react-icons/bs";
import useBattlemapStore from "@/stores/battlemapStore";
import * as mutations from "@/graphql/mutations";
import {AiFillPlayCircle} from "react-icons/ai";

function SongButton({song, playSong}) {
  if (song) {
    return <ListItem className="menuItem">
      <ListItemText primary={song}/>
      <ListItemButton sx={{flexGrow: 0, display: "block", minWidth: "auto"}} className={styles.addButton}
                      onClick={() => playSong(song)} edge="end">
        <BsFillPlayFill size={30}/>
      </ListItemButton>
    </ListItem>
  }
  return null
}

const PlaylistMenu = ({playlist, playSong, playPlaylist}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{"display": "flex"}}>
      <div style={{"display": "block"}}>
        <ListItemButton onClick={handleClick} className="menuItem">
          <ListItemIcon>
            {open ? <BsFillCaretDownFill/> : <BsFillCaretRightFill/>}
          </ListItemIcon>
          <ListItemText primary={playlist.name}/>

        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {playlist.songs.map((song) => (
              <SongButton
                key={song}
                song={song}
                playSong={playSong}
              />
            ))}
          </List>
        </Collapse>
      </div>
      <ListItemButton sx={{flexGrow: 0, display: "block", minWidth: "auto"}} className={styles.addButton}
                      onClick={() => playPlaylist(playlist.name, playlist.songs)} edge="end"
                      style={{position: "absolute", right: "0"}}>
        <AiFillPlayCircle size={30}/>
      </ListItemButton>
    </div>
  )
}

const MusicLibrary = () => {
  const {gameID} = useBattlemapStore();
  const [shuffle, setShuffle] = useState(false)

  const playSong = async (key) => {
    const newSong = {
      id: gameID,
      activeSong: key
    }

    const updatedGame = await API.graphql({
      query: mutations.updateGame,
      variables: {input: newSong}
    });

    console.log(updatedGame)
  };

  const playPlaylist = async (playlistName, songs) => {
    // const newSong = {
    //   id: gameID,
    //   activeSong: key
    // }
    //
    // const updatedGame = await API.graphql({
    //   query: mutations.updateGame,
    //   variables: {input: newSong}
    // })
    //
    // console.log(updatedGame)

  }

  return (
    <div className={styles.container}>
      <List className={styles.tokenList}>
        {playlists.map((item) => (
          <PlaylistMenu key={item.name} playlist={item} playSong={playSong} playPlaylist={playPlaylist}/>
        ))}
      </List>
    </div>
  );
};

export default MusicLibrary;
