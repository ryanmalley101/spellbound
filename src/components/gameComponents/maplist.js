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
import {onCreateMap, onCreateToken} from "@/graphql/subscriptions";
import * as PropTypes from "prop-types";
import {AiFillDelete} from "react-icons/ai";
import IconButton from "@mui/material/IconButton";

function CreateMapDialog(props) {
  return <>
    {/* Dialog for entering map size and name */}
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create New Map</DialogTitle>
      <DialogContent>
        <TextField
          label="Size X"
          variant="outlined"
          fullWidth
          value={props.value}
          onChange={props.onChange}
          type="number"
        />
        <TextField
          label="Size Y"
          variant="outlined"
          fullWidth
          value={props.value1}
          onChange={props.onChange1}
          type="number"
        />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={props.value2}
          onChange={props.onChange2}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onClick} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

CreateMapDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  value1: PropTypes.string,
  onChange1: PropTypes.func,
  value2: PropTypes.string,
  onChange2: PropTypes.func,
  onClick: PropTypes.func
};
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

  const removeMap = async (mapId) => {
    const response = await API.graphql({
      query: mutations.deleteMap,
      variables: {
        input: {
          id: mapId
        }
      },
    });

    console.log(response);
    setMapList((oldMapList) => oldMapList.filter((map) => map.id !== mapId));
  };

  const subscribeToMapCreation = () => {
    const subscriptionHandler = (data) => {
      const newMap = data.value.data.onCreateMap;
      console.log('Map Created ', newMap)
      setMapList((oldMaps) => [...oldMaps, newMap]);
    };

    const subscription = API.graphql(
      graphqlOperation(onCreateMap, {mapTokensId: activeMap}),
      {
        filter: {
          mutationType: {
            eq: 'create',
          },
        },
      }
    ).subscribe({
      next: (data) => {
        subscriptionHandler(data);
      },
      error: (error) => {
        console.error('Subscription Error:', error);
      },
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }

  useEffect(() => {
    const unsubscribeToCreation = subscribeToMapCreation();
    return () => {
      unsubscribeToCreation();
    };
  }, [gameID])

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
            <IconButton
              onClick={(event) => {
                event.stopPropagation(); // Prevents the parent's onClick from firing
                removeMap(map.id); // Call your delete function here
              }}
            >
              <AiFillDelete/> {/* Replace with your delete icon */}
            </IconButton>
          </ListItemButton>
        ))}
      </List>

      <CreateMapDialog open={open} onClose={handleClose} value={mapSizeX} onChange={(e) => setMapSizeX(e.target.value)}
                       value1={mapSizeY} onChange1={(e) => setMapSizeY(e.target.value)} value2={mapName}
                       onChange2={(e) => setMapName(e.target.value)} onClick={createMap}/>
    </div>
  );
};

export default MapList;
