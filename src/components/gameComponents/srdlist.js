import React, {useEffect, useState} from "react";
import battlemapStore from "@/stores/battlemapStore";
import styles from "@/styles/SRDList.module.css";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Image from "next/image";
import {BsFillFilePlusFill} from "react-icons/bs";

const SRDList = () => {
  const addMonsterBlock = battlemapStore((state) => state.addMonsterBlock);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState(""); // State variable to store the filter value

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.open5e.com/v1/monsters/`);
      const data = await response.json();
      console.log(data);
      setResults(data.results);
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
