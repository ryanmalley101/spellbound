import React, {useEffect, useState} from "react";
import styles from "@/styles/JournalList.module.css";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import useBattlemapStore from "@/stores/battlemapStore";
import {getExampleCharacter} from "@/5eRefence/characterSheetGenerators";

const JournalList = () => {
  const characterSheetWindows = useBattlemapStore((state) => state.characterSheetWindows);
  const addCharacterSheetWindow = useBattlemapStore((state) => state.addCharacterSheetWindow);
  const [characterSheets, setCharacterSheets] = useState([]);

  useEffect(() => {
    const exampleCharacter = getExampleCharacter()
    setCharacterSheets([exampleCharacter])
  }, [])

  const showWindow = (sheet) => {
    console.log(characterSheetWindows)
    console.log(sheet)
    addCharacterSheetWindow(sheet)
  }

  return (
    <List className={styles.sheetList}>
      {characterSheets.map((sheet) => (
        <ListItemButton key={sheet.id} onClick={() => showWindow(sheet)}>
          <ListItemText primary={sheet.name}/>
        </ListItemButton>
      ))}
    </List>
  );
};

export default JournalList;