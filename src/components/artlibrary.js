import React, {useState} from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import {BsFillCaretDownFill, BsFillCaretRightFill, BsFillFilePlusFill} from 'react-icons/bs';
import Image from 'next/image';
import styles from "@/styles/ArtLibrary.module.css"
import useBattlemapStore from "@/stores/battlemapStore";
import DraggableIcon from "@/components/draggableicon";
import {v4 as uuidv4} from 'uuid';

const DirectoryMenu = ({directory, parentPath = '', filter}) => {

  const [open, setOpen] = useState(false);
  const insertToken = useBattlemapStore(state => state.addToken)

  const handleClick = () => {
    setOpen(!open);
  };

  const titleCase = (str) => {
    return str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  const addToken = (path) => {
    console.log(path)
    const newToken = <DraggableIcon key={uuidv4()} imgsrc={path}/>
    insertToken(newToken)
  }

  if (directory.type === 'file') {
    const imagePath = parentPath + directory.name; // Build the full path to the image
    const display = !filter || directory.name.toLowerCase().includes(filter.toLowerCase()); // Check if the file matches the filter
    const trimmedName = titleCase(directory.name.split('.png')[0])
    return display ? (
      <ListItem className="menuItem">
        <ListItemIcon>
          <Image src={imagePath} alt={directory.name} width={50} height={50}/>
        </ListItemIcon>
        <ListItemText primary={trimmedName}/>
        <ListItemButton sx={{flexGrow: 0, display: 'block', minWidth: 'auto'}} className={styles.addButton}
                        onClick={() => addToken(imagePath)} edge="end">
          <BsFillFilePlusFill size={30}/>
        </ListItemButton>
      </ListItem>
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
              <DirectoryMenu
                key={item.name}
                directory={item}
                parentPath={currentPath}
                filter={filter}
              />
            ))}
          </List>
        </Collapse>
      </div>
    );
  }

  return null;
};

const ArtLibrary = ({artDirectory}) => {
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
          <DirectoryMenu key={item.name} directory={item} parentPath="/tokens/"
                         filter={filter}/>
        ))}
      </List>
    </div>
  );
};

export default ArtLibrary;
