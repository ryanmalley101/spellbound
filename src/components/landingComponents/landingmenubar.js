// LandingMenuBar.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {Button, Menu, MenuItem} from "@mui/material";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";

const LandingMenuBar = ({user, setUser}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const router = useRouter();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const routeToSignIn = () => {
        router.push("/signin");
    };

    const routeToSignUp = () => {
        router.push("/signup");
    };

    // Function to log out the user
    const handleLogout = async () => {
        try {
            await Auth.signOut();
            console.log("User logged out successfully.");
            setUser(null);
            // You can redirect the user to the login page or perform any other action after logging out.
        } catch (error) {
            console.log("Error signing out:", error);
        }
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box
                        component="img"
                        sx={{
                            height: 60,
                            width: 60,
                            maxHeight: {xs: 233, md: 167},
                            maxWidth: {xs: 350, md: 250},
                        }}
                        alt="Spellbound Logo"
                        src="icons/spellbook.png"
                    />
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Spellbound Tabletop
                    </Typography>
                    {user ? (
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography variant="h6" sx={{flexGrow: 1}}>
                                {user.username}
                            </Typography>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <Button
                                size="large"
                                aria-label="Sign In"
                                onClick={routeToSignIn}
                                color="inherit"
                            >
                                Log In
                            </Button>
                            <Button
                                size="large"
                                aria-label="Sign Up"
                                onClick={routeToSignUp}
                                color="inherit"
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default LandingMenuBar;
