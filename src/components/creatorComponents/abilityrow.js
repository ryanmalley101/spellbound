import React, {useEffect, useState} from "react";
import styles from "@/styles/CreateMonsterStatblock.module.css";
import IconButton from "@mui/material/IconButton";
// import {BsFillTrashFill} from "react-icons/bs/filltrashfill";
import {BsFillTrashFill} from "react-icons/bs";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const AbilityRow = ({ability, index, handleAbilityUpdate, handleAbilityRemove}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div style={{display: "inline-block", width: "100%"}}>
                <button type={"button"} onClick={() => setOpen(true)} style={{display: "inline-flex", width: "90%"}}
                        className={styles.abilityButton}>
                    <p><strong>{ability.name}&nbsp;</strong></p>
                    <p>{ability.desc}</p>
                </button>
                <IconButton type={"button"} onClick={(index) => handleAbilityRemove(index)}>
                    <BsFillTrashFill/>
                </IconButton>
            </div>
            <AbilityDialog open={open} ability={ability} index={index} onClose={handleClose}
                           handleAbilityUpdate={handleAbilityUpdate}/>
        </div>
    )
}

const AbilityDialog = ({open, ability, index, onClose, handleAbilityUpdate}) => {

    const [abilityName, setAbilityName] = useState('')
    const [abilityDesc, setAbilityDesc] = useState('')

    useEffect(() => {
        if (ability) {
            setAbilityName(ability.name)
            setAbilityDesc(ability.desc)
        }
    }, [ability]);

    const confirm = () => {
        handleAbilityUpdate({name: abilityName, desc: abilityDesc}, index)
        onClose()
    }

    return <>
        {/* Dialog for entering map size and name */}
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ability</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={abilityName}
                    onChange={(e) => setAbilityName(e.target.value)}
                    type="text"
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={abilityDesc}
                    onChange={(e) => setAbilityDesc(e.target.value)}
                    type="text"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={confirm} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    </>;
}

export default AbilityRow