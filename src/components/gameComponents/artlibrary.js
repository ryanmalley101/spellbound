import React, {useEffect, useState} from 'react';
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {BsFillCaretDownFill, BsFillCaretRightFill, BsFillFilePlusFill} from 'react-icons/bs';
import Image from 'next/image';
import styles from "@/styles/ArtLibrary.module.css"
import useBattlemapStore from "@/stores/battlemapStore";
import {API, Storage} from "aws-amplify";
import * as mutations from "@/graphql/mutations";

function ImageButton(props) {
    const [imagePath, setImagePath] = useState("")

    useEffect(() => {
        const fetchImagePath = async () => {
            try {
                console.log(`Fetching image src ${props.src}`)
                Storage.configure({level: 'public'});
                const signedUrl = await Storage.get(`${props.src.substring(1)}`, {
                    validateObjectExistence: true
                });
                // console.log("Got image")
                console.log(signedUrl)
                setImagePath(signedUrl);
            } catch (e) {
                console.log("Error getting S3 signed URL")
                console.log(e);
                // setImagePath(props.src);
            }
        };

        fetchImagePath();
    }, [props.src]);

    if (imagePath) {

        return <ListItem className="menuItem">
            <ListItemIcon>
                <Image src={imagePath} alt={props.alt} width={50} height={50}/>
            </ListItemIcon>
            <ListItemText primary={props.primary}/>
            <ListItemButton sx={{flexGrow: 0, display: "block", minWidth: "auto"}} className={styles.addButton}
                            onClick={props.onClick} edge="end">
                <BsFillFilePlusFill size={30}/>
            </ListItemButton>
        </ListItem>
    }

    return null
}


const ArtDirectoryMenu = ({directory, parentPath = '', filter, user}) => {

    const [open, setOpen] = useState(false);
    const {activeMap} = useBattlemapStore()

    const handleClick = () => {
        setOpen(!open);
    };

    const titleCase = (str) => {
        console.log(str)
        return str.toLowerCase().split(' ').map((word) => {
            if (word[0]) {
                return word.replace(word[0], word[0].toUpperCase());
            } else {
                return word
            }
        }).join(' ');
    }

    const addToken = async (path) => {
        const input = {
            imageURL: path,
            mapTokensId: activeMap,
            positionX: 0,
            positionY: 0,
            rotation: 0,
            width: 50,
            height: 50
        };

        console.log(path)
        // Call the createNewGame mutation
        const newToken = await API.graphql({
            query: mutations.createToken,
            variables: {input: input}
        });

        console.log("Creating a new token")
        console.log(newToken)
        return newToken.data.createToken.id
    }

    if (directory.type === 'file') {
        const combinedName = `${parentPath}${directory.name}`
        const display = !filter || directory.name.toLowerCase().includes(filter.toLowerCase()); // Check if the file matches the filter
        const trimmedName = titleCase(directory.name.split('.png')[0])
        return display ? (
            <ImageButton src={combinedName} alt={directory.name} primary={trimmedName}
                         onClick={() => addToken(combinedName)}
                         user={user}/>
        ) : null;
    }

    if (directory.type === 'directory') {
        const currentPath = parentPath + directory.name + '/'; // Build the current directory path
        const childrenDisplay = directory.children.filter((child) =>
            child.name.toLowerCase().includes(filter.toLowerCase())
        ); // Filter children based on the filter value

        if (childrenDisplay.length === 0) {
            return null; // Don't render the directory if no matching children
        }

        return (
            <div>
                <ListItemButton onClick={handleClick} className="menuItem">
                    <ListItemIcon>
                        {open ? <BsFillCaretDownFill/> : <BsFillCaretRightFill/>}
                    </ListItemIcon>
                    <ListItemText primary={directory.name}/>
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {childrenDisplay.map((item) => (
                            <ArtDirectoryMenu
                                key={item.name}
                                directory={item}
                                parentPath={currentPath}
                                filter={filter}
                                user={user}
                            />
                        ))}
                    </List>
                </Collapse>
            </div>
        );
    }

    return null;
};

const ArtLibrary = ({artDirectory, user}) => {
    console.log(artDirectory)
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };


    return (
        <div className={styles.container}>
            <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter"/>
            <List className={styles.tokenList}>
                {artDirectory.children.map((item) => (
                    <ArtDirectoryMenu key={item.name} directory={item} parentPath="/defaultTokens/"
                                      filter={filter} user={user}/>
                ))}
            </List>
        </div>
    );
};

export default ArtLibrary;
