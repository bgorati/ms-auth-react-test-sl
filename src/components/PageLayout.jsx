import React, { useState } from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import { Box, Container, Grid, Button, Menu, MenuItem, Stack, Avatar, InputBase } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

export const PageLayout = ({ onDataChange }) => {
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // setAnchorEl(null);
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    };

    const handleSign = () => {
        // setAnchorEl(null);
        instance.loginRedirect(loginRequest).catch(e => {
            console.log(e);
        });
    };

    const [childInput, setChildInput] = useState('');
    const handleChange = (e) => {
        const newData = e.target.value;
        setChildInput(newData);

        // Send data to the parent using the callback function
        onDataChange(newData);
    };

    return (
        <div className='header'>
            <Container fixed >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} alignItems={"center"} justifyContent={'space-between'}>
                        <Grid item xs={2} className="logo">
                            <img src="https://www.sutherlandglobal.com/assets/homepage-2021/assets/img/sutherland-logo-colour.svg" />
                            {/* <small>React Assignment</small> */}
                        </Grid>
                        <Grid item xs={7}>
                            <AuthenticatedTemplate>
                                <InputBase
                                    className="global-search"
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search Name"
                                    value={childInput}
                                    onChange={handleChange}
                                />
                            </AuthenticatedTemplate>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <UnauthenticatedTemplate>
                                    <Button variant="contained" onClick={handleSign}>Sign in</Button>
                                </UnauthenticatedTemplate>
                                <AuthenticatedTemplate>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar
                                            sx={{ bgcolor: deepPurple[500] }}
                                        >
                                            {
                                                accounts[0]?.name?.charAt(0) +
                                                accounts[0]?.name?.split(" ")[1].charAt(0)
                                            }
                                        </Avatar>
                                    </Stack>
                                </AuthenticatedTemplate>
                            </Button>
                            {isAuthenticated &&
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};
