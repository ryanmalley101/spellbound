import React, {useState} from 'react';
import 'react-tabs/style/react-tabs.css';
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import useBattlemapStore from "@/stores/battlemapStore";
import {API} from "aws-amplify";
import * as mutations from "@/graphql/mutations";


const SettingsMenu = () => {
  const [selectedOption, setSelectedOption] = useState('5eSRD')
  const gameMode = useBattlemapStore((state) => state.gameMode)
  const setGameMode = useBattlemapStore((state) => state.setGameMode)
  const gameID = useBattlemapStore((state) => state.gameID)
  
  const handleOptionChange = async (event) => {
    let updatedGameMode = {
      id: gameID,
    }
    if (gameMode === "Elden Ring") {
      updatedGameMode.gameMode = "5eSRD"
    } else {
      updatedGameMode.gameMode = "Elden Ring"
    }
    const updatedGame = await API.graphql({
      query: mutations.updateGame,
      variables: {input: updatedGameMode}
    })
    console.log(updatedGame)
    setGameMode(updatedGame.data.updateGame.gameMode)
    setSelectedOption(event.target.value)
  }

  return (
    <RadioGroup
      row
      aria-label="gameOptions"
      name="gameOptions"
      value={selectedOption}
      onChange={handleOptionChange}
    >
      <FormControlLabel
        value="5eSRD"
        control={<Radio/>}
        label="5eSRD"
        labelPlacement="start"
      />
      <FormControlLabel
        value="EldenRing"
        control={<Radio/>}
        label="Elden Ring"
        labelPlacement="start"
      />
    </RadioGroup>
  );
}

export default SettingsMenu