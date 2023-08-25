import React, {useState} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChatRoom from "@/components/gameComponents/chatroom";
import styles from "@/styles/TabMenu.module.css"
import {BsBook, BsChatLeftDots, BsCodeSlash, BsGear, BsMusicNoteList} from 'react-icons/bs'
import {AiOutlinePicture} from 'react-icons/ai'
import {SiDungeonsanddragons} from "react-icons/si";
import AudioPlayer from "@/components/gameComponents/audioplayer";
import ArtLibrary from "@/components/gameComponents/artlibrary";
import artDirectory from '../../../public/art_directory.json';
import JournalList from "@/components/gameComponents/journallist";
import SRDList from "@/components/gameComponents/srdlist";
import {GiCompass} from "react-icons/gi";
import MapList from "@/components/gameComponents/maplist";
import {CiMusicNote1} from "react-icons/ci";
import SettingsMenu from "@/components/gameComponents/settingsmenu";

const TabMenu = ({user}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSelect = (index) => {
    setSelectedTab(index);
  };

  const song = {
    "url": "music/test.mp3",
    "title": "Bohemian Rhapsody",
    "artist": "Queen"
  }

  return (
    <div className={styles.TabMenu}>
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect} className={styles.ReactTabs}>
        <TabList className={styles.ReactTabsList}>
          <Tab><BsChatLeftDots size={24}/></Tab>
          <Tab><AiOutlinePicture size={24}/></Tab>
          <Tab><BsBook size={24}/></Tab>
          <Tab><GiCompass size={24}/></Tab>
          <Tab><SiDungeonsanddragons size={24}/></Tab>
          <Tab><CiMusicNote1 size={24}/></Tab>
          <Tab><BsCodeSlash size={24}/></Tab>
          <Tab><BsGear size={24}/></Tab>
        </TabList>

        <TabPanel name={"Chatroom"} className={styles.ReactTabsPanel}>
          <ChatRoom user={user}/>
        </TabPanel>

        <TabPanel name={"Art Library"} className={styles.ReactTabsPanel}>
          <ArtLibrary artDirectory={artDirectory} user={user}/>
        </TabPanel>

        <TabPanel className={styles.ReactTabsPanel}>
          {/* Content for the Journal */}
          <h2>Journal Content</h2>
          <JournalList/>
          {/* Add your journal component here */}
        </TabPanel>

        <TabPanel className={styles.ReactTabsPanel}>
          {/* Content for the Journal */}
          <MapList/>
          {/* Add your journal component here */}
        </TabPanel>

        <TabPanel className={styles.ReactTabsPanel}>
          {/* Content for the Compendium */}
          <SRDList/>
          {/* Add your compendium component here */}
        </TabPanel>

        <TabPanel className={styles.ReactTabsPanel}>
          {/* Content for the Music */}
          <h2>Music Content</h2>
          <AudioPlayer song={song}/>
          {/* Add your music component here */}
        </TabPanel>

        <TabPanel className={styles.ReactTabsPanel}>
          {/* Content for the Macros */}
          <h2>Macros Content</h2>
          {/* Add your macros component here */}
        </TabPanel>

        <TabPanel className={styles.ReactTabsPanel}>
          {/* Content for the Settings */}
          <h2>Settings Content</h2>
          <SettingsMenu/>
          {/* Add your settings component here */}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabMenu;