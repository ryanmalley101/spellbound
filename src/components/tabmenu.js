import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChatRoom from "@/components/chatroom";
import styles from "@/styles/TabMenu.module.css"
import {BsBook, BsChatLeftDots, BsCodeSlash, BsGear, BsMusicNoteList} from 'react-icons/bs'
import {AiOutlinePicture} from 'react-icons/ai'
import {SiDungeonsanddragons} from "react-icons/si";

const TabMenu = ( {user} ) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSelect = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className={styles.TabMenu}>
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect} className={styles.ReactTabs}>
        <TabList className={styles.ReactTabsList}>
          <Tab><BsChatLeftDots size={24} /></Tab>
          <Tab><AiOutlinePicture size={24}/></Tab>
          <Tab><BsBook size={24}/></Tab>
          <Tab><SiDungeonsanddragons size={24}/></Tab>
          <Tab><BsMusicNoteList size={24}/></Tab>
          <Tab><BsCodeSlash size={24}/></Tab>
          <Tab><BsGear size={24}/></Tab>
        </TabList>

        <TabPanel className={styles.ReactTabsPanel}>
          <ChatRoom user={user}/>
        </TabPanel>

        <TabPanel >
          {/* Content for the Art Library */}
          <h2>Art Library Content</h2>
          {/* Add your art library component here */}
        </TabPanel>

        <TabPanel>
          {/* Content for the Journal */}
          <h2>Journal Content</h2>
          {/* Add your journal component here */}
        </TabPanel>

        <TabPanel>
          {/* Content for the Compendium */}
          <h2>Compendium Content</h2>
          {/* Add your compendium component here */}
        </TabPanel>

        <TabPanel>
          {/* Content for the Music */}
          <h2>Music Content</h2>
          {/* Add your music component here */}
        </TabPanel>

        <TabPanel>
          {/* Content for the Macros */}
          <h2>Macros Content</h2>
          {/* Add your macros component here */}
        </TabPanel>

        <TabPanel>
          {/* Content for the Settings */}
          <h2>Settings Content</h2>
          {/* Add your settings component here */}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabMenu;