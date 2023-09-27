import React, {useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChatRoom from "@/components/gameComponents/chatroom";
import styles from "@/styles/TabMenu.module.css"
import {BsBook, BsChatLeftDots, BsCodeSlash, BsCompass, BsGear} from 'react-icons/bs'
import {AiOutlinePicture} from 'react-icons/ai'
import AudioPlayer from "@/components/gameComponents/audioplayer";
import ArtLibrary from "@/components/gameComponents/artlibrary";
import artDirectory from '../../../public/art_directory.json';
import JournalList from "@/components/gameComponents/journallist";
import SRDList from "@/components/gameComponents/srdlist";
import MapList from "@/components/gameComponents/maplist";
import {CiMusicNote1} from "react-icons/ci";
import SettingsMenu from "@/components/gameComponents/settingsmenu";
import MusicLibrary from "@/components/gameComponents/musiclibrary";
import {FaDragon} from "react-icons/fa";

const TabMenu = ({user, messages}) => {
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
                    <Tab><BsCompass size={24}/></Tab>
                    <Tab><FaDragon size={24}/></Tab>
                    <Tab><CiMusicNote1 size={24}/></Tab>
                    <Tab><BsCodeSlash size={24}/></Tab>
                    <Tab><BsGear size={24}/></Tab>
                </TabList>

                <TabPanel name={"Chatroom"} className={styles.ReactTabsPanel}>
                    <ChatRoom user={user} messages={messages}/>
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
                    <MusicLibrary/>
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
            <AudioPlayer autoPlay/>
        </div>
    );
};

export default TabMenu;