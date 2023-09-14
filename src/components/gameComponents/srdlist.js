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
import elden_ring from '../../../public/elden_ring.json'
import {listMonsterStatblocks} from "@/graphql/queries";

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

    const items = category.items.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0
    })

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
                    {items.map((item) => (
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
    const ashOfWarCards = useBattlemapStore((state) => state.ashOfWarCards)

    const {
        addMonsterBlock,
        addSpellCard,
        addMagicItemCard,
        addWeaponCard,
        addArmorCard,
        addConditionCard,
        addAshOfWarCard
    } = useBattlemapStore();
    const {
        removeMonsterBlock,
        removeSpellCard,
        removeMagicItemCard,
        removeWeaponCard,
        removeArmorCard,
        removeConditionCard,
        removeAshOfWarCard
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
            case "ashesofwar":
                console.log(item)
                if (ashOfWarCards.some(block => block.slug !== item.slug) || ashOfWarCards.length === 0) {
                    addAshOfWarCard(item.slug)
                } else {
                    removeAshOfWarCard(item.slug)
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
    const gameMode = useBattlemapStore(state => state.gameMode)
    const [list, setList] = useState([])

    useEffect(() => {
        const fetchSRDMonsters = async () => {

            if (gameMode === "Elden Ring") {
                setList(elden_ring)
            } else {
                const input = {filter: {ownerId: {eq: "wotc-srd"}}}
                const response = await API.graphql({
                    query: listMonsterStatblocks,
                    variables: {input: input},
                });
                const monsterList = response.data.listMonsterStatblocks.items.map((monster) => {
                    return {name: monster.name, slug: monster.id}
                })

                setList(srd.map((section) => {
                    if (section.name === "Monsters") {
                        return {name: "Monsters", items: monsterList}
                    }
                    return section
                }))
            }
        }

        fetchSRDMonsters()
    }, []);


    console.log(gameMode, list)

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
                <CategoryMenu filter={filter} categories={list}/>
            </div>
        </div>
    );
};

export default SRDList;
