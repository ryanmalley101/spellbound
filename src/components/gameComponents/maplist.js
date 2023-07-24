import React, {useState, useEffect} from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useBattlemapStore from "@/stores/battlemapStore";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {onCreateMap} from "@/graphql/subscriptions";

const MapList = () => {
  const [mapList, setMapList] = useState([]);
  const {gameID, playerID, activeMap} = useBattlemapStore();
  const [open, setOpen] = useState(false);
  const [mapSizeX, setMapSizeX] = useState("");
  const [mapSizeY, setMapSizeY] = useState("");
  const [mapName, setMapName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createMap = async () => {
    try {
      if (mapSizeX && mapSizeY && mapName) {
        const input = {
          gameMapsId: gameID,
          sizeX: Number(mapSizeX),
          sizeY: Number(mapSizeY),
          name: mapName,
        };
        console.log("Creating a new map");
        console.log(input);

        // Call the createMap mutation
        const newMap = await API.graphql({
          query: mutations.createMap,
          variables: {input: input},
        });

        console.log(newMap);
        setMapList([...mapList, newMap.data.createMap]);
        handleClose();
      }
    } catch (error) {
      console.error("Error creating map:", error);
    }
  };

  useEffect(() => {
    const retrieveMaps = async () => {
      const response = await API.graphql({
        query: `
          query GetGameMaps($id: ID!) {
            getGame(id: $id) {
              maps {
                items {
                  id
                  name
                  sizeX
                  sizeY
                }
              }
            }
          }
        `,
        variables: {
          id: gameID,
        },
      });

      console.log(response);
      setMapList(response.data.getGame.maps.items);
    };
    retrieveMaps();
  }, [gameID]);

  useEffect(() => {
    const subscriptionHandler = (data) => {
      console.log("Created Map:", data);

      const newMap = data.value.data.onCreateMap;
      setMapList([...mapList, newMap]);
    };

    const subscription = API.graphql(graphqlOperation(onCreateMap, {gameMapId: gameID}), {
      filter: {
        mutationType: {
          eq: "create",
        },
      },
    }).subscribe({
      next: (data) => {
        subscriptionHandler(data);
      },
      error: (error) => {
        console.error("Subscription Error:", error);
      },
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const setActiveMap = async (map) => {
    const input = {
      gameMapsId: gameID,
      sizeX: map.sizeX,
      sizeY: map.sizeY,
      name: map.name,
    };

    console.log("Setting new active map");
    console.log(input);
    const activeMapDetails = {
      id: gameID,
      activeMap: map.id,
    };

    try {
      // Call the updateGame mutation
      const updatedGame = await API.graphql({
        query: mutations.updateGame,
        variables: {input: activeMapDetails},
      });
      console.log(updatedGame);

      return updatedGame;
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<AddIcon/>} onClick={handleOpen}>
        Create Map
      </Button>
      <Typography variant="h6" gutterBottom>
        Maps
      </Typography>
      <List>
        {mapList.map((map) => (
          <ListItemButton
            key={map.id}
            onClick={() => setActiveMap(map)}
            // Conditionally apply a distinctive style if the map id matches the activeMap state
            style={{
              backgroundColor: map.id === activeMap ? "#E0E0E0" : "inherit",
              fontWeight: map.id === activeMap ? "bold" : "normal",
            }}
          >
            <ListItemText primary={map.name}/>
          </ListItemButton>
        ))}
      </List>

      {/* Dialog for entering map size and name */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Map</DialogTitle>
        <DialogContent>
          <TextField
            label="Size X"
            variant="outlined"
            fullWidth
            value={mapSizeX}
            onChange={(e) => setMapSizeX(e.target.value)}
            type="number"
          />
          <TextField
            label="Size Y"
            variant="outlined"
            fullWidth
            value={mapSizeY}
            onChange={(e) => setMapSizeY(e.target.value)}
            type="number"
          />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={mapName}
            onChange={(e) => setMapName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createMap} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MapList;
