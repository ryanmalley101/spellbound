import React, {useEffect, useState} from "react";
import battlemapStore from "@/stores/battlemapStore";
import styles from "@/styles/SRDList.module.css";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Image from "next/image";
import {BsFillFilePlusFill} from "react-icons/bs";
import srdMonsters from '../../../public/srd_monsters.json';

const SRDList = () => {
  const addMonsterBlock = battlemapStore((state) => state.addMonsterBlock);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState(""); // State variable to store the filter value

  useEffect(() => {
    async function fetchData() {
      setResults(srdMonsters);
    }

    fetchData();
  }, []);

  const addMonsterWindow = (slug) => {
    console.log(slug);
    addMonsterBlock(slug);
  };

  // Filter the results based on the monster name
  const filteredResults = results.filter((monster) =>
    monster.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Add an input field for filtering */}
      <input
        type="text"
        placeholder="Filter by monster name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.filterInput}
      />
      {/* Wrap List inside a div and apply scrollbar styles to it */}
      <div className={styles.srdListContainer}>
        <List className={styles.srdList}>
          {filteredResults.map((monster) => (
            <ListItemButton
              key={monster.slug}
              onClick={() => addMonsterWindow(monster.slug)}
            >
              <ListItemIcon>
                {/* Add an icon to each list item */}
                <BsFillFilePlusFill size={20}/>
              </ListItemIcon>
              <ListItemText primary={monster.name}/>
            </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  );
};

export default SRDList;
