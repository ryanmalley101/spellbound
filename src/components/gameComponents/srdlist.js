import React, {useEffect, useState} from "react";
import battlemapStore from "@/stores/battlemapStore";
import styles from "@/styles/JournalList.module.css";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Image from "next/image";
import {BsFillFilePlusFill} from "react-icons/bs";

const SRDList = () => {
  const addMonsterBlock = battlemapStore((state) => state.addMonsterBlock);
  const [results, setResults] = useState([]); // State variable to store the results

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.open5e.com/v1/monsters/`);
      const data = await response.json()
      console.log(data)
      setResults(data.results)
    }

    const results = fetchData();
  }, []);

  const addMonsterWindow = (slug) => {
    console.log(slug)
    addMonsterBlock(slug)
  }

  return (
    <List className={styles.sheetList} sx={{paddingTop: 0, paddingBottom: 0}}>
      {results.map((monster) => (
        <ListItemButton key={monster.slug} onClick={() => addMonsterWindow(monster.slug)}>
          <ListItemText primary={monster.name}/>
        </ListItemButton>
      ))}
    </List>
  );
};

export default SRDList;