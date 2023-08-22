import React, {useEffect, useState} from "react";
import battlemapStore from "@/stores/battlemapStore";
import styles from "@/styles/SRDList.module.css";
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Image from "next/image";
import {BsFillCaretDownFill, BsFillCaretRightFill, BsFillFilePlusFill} from "react-icons/bs";
import srd from '../../../public/5esrd.json';
import useBattlemapStore from "@/stores/battlemapStore";
import {API} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {shallow} from "zustand/shallow";

const CategoryMenu = ({categories, filter, user}) => {
  console.log(categories)
  return (
    <div>
      {categories.map((category) => (
        <CategorySubMenu
          key={category.name}
          category={category}
          filter={filter}
          user={user}
        />
      ))}
    </div>
  );
};

const CategorySubMenu = ({category, filter, user}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  console.log(category)

  return (
    <div>
      <ListItemButton onClick={handleClick} className="menuItem">
        <ListItemIcon>
          {open ? <BsFillCaretDownFill/> : <BsFillCaretRightFill/>}
        </ListItemIcon>
        <ListItemText primary={category.name.charAt(0).toUpperCase()
          + category.name.slice(1)}/>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.items.map((item) => (
            <Item
              key={item.slug}
              category_name={category.name.toLowerCase().replaceAll(" ", "")}
              item={item}
              filter={filter}
              user={user}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};

const Item = ({category_name, item, filter}) => {
  const monsterBlocks = useBattlemapStore((state) => state.monsterBlocks)
  const spellCards = useBattlemapStore((state) => state.spellCards)
  const magicItemCards = useBattlemapStore((state) => state.magicItemCards)
  const weaponCards = useBattlemapStore((state) => state.magicItemCards)
  const armorCards = useBattlemapStore((state) => state.armorCards)
  const conditionCards = useBattlemapStore((state) => state.conditionCards)

  const {
    addMonsterBlock,
    addSpellCard,
    addMagicItemCard,
    addWeaponCard,
    addArmorCard,
    addConditionCard
  } = useBattlemapStore();
  const {
    removeMonsterBlock,
    removeSpellCard,
    removeMagicItemCard,
    removeWeaponCard,
    removeArmorCard,
    removeConditionCard
  } = useBattlemapStore();

  const showWindow = (item, category_name) => {
    console.log(`Showing Window for ${category_name} ${item.name}`);
    switch (category_name) {
      case "monsters":
        if (monsterBlocks.some(block => block.slug !== item.slug) || monsterBlocks.length === 0) {
          addMonsterBlock(item.slug);
        } else {
          removeMonsterBlock(item.slug)
        }
        break
      case "spells":
        if (spellCards.some(block => block.slug !== item.slug) || spellCards.length === 0) {
          addSpellCard(item.slug);
        } else {
          removeSpellCard(item.slug)
        }
        break
      case "magicitems":
        console.log(magicItemCards.filter((card) => card === {slug: item.slug}) !== [])
        if (magicItemCards.some(block => block.slug !== item.slug) || magicItemCards.length === 0) {
          addMagicItemCard(item.slug);
        } else {
          removeMagicItemCard(item.slug)
        }
        break
      case "weapons":
        console.log(weaponCards.filter((card) => card === {slug: item.slug}) !== [])
        if (weaponCards.some(block => block.slug !== item.slug) || weaponCards.length === 0) {
          addWeaponCard(item.slug);
        } else {
          removeWeaponCard(item.slug)
        }
        break
      case "armor":
        console.log(armorCards.filter((card) => card === {slug: item.slug}) !== [])
        if (armorCards.some(block => block.slug !== item.slug) || armorCards.length === 0) {
          addArmorCard(item.slug);
        } else {
          removeArmorCard(item.slug)
        }
        break
      case "conditions":
        console.log(item)
        if (conditionCards.some(block => block.slug !== item.slug) || conditionCards.length === 0) {
          addConditionCard(item.slug);
        } else {
          removeConditionCard(item.slug)
        }
        break
    }
  }

  if (item.name.toLowerCase().includes(filter.toLowerCase())) {
    return (
      <ListItemButton key={item.name} onClick={() => showWindow(item, category_name)}>
        <ListItemText primary={item.name}/>
      </ListItemButton>
    );
  }
  return null

};

const SRDList = () => {
  const [filter, setFilter] = useState(""); // State variable to store the filter value
  console.log(srd)
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
      <div className={styles.srdList}>
        <CategoryMenu filter={filter} categories={srd}/>
      </div>
    </div>
  );
};

export default SRDList;
