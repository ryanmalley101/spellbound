import React, {useState} from "react";
import battlemapStore from "@/stores/battlemapStore";
import styles from "@/styles/ArtLibrary.module.css";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Image from "next/image";
import {BsFillFilePlusFill} from "react-icons/bs";

const JournalList = () => {
  const characterSheets = battlemapStore((state) => state.characterSheets);
  const toggleCharacterSheet = battlemapStore((state) => state.toggleSheetVisibility);

  return (
    <List className={styles.sheetList}>
      {characterSheets.map((sheet) => (
        <ListItemButton key={sheet.id} onClick={() => toggleCharacterSheet(sheet.id)}>
          <ListItemText primary={sheet.name}/>
        </ListItemButton>
      ))}
    </List>
  );
};

export default JournalList;