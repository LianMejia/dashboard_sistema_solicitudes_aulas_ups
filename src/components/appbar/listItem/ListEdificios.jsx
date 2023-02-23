import React, { useState, useRef, useEffect } from 'react';
import { ListItemIcon, ListItemButton, Collapse, ListItemText, List } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LocationCityIcon from '@mui/icons-material/LocationCity';

export const ListEdificios = () => {
    const userAuth = useSelector(state => state.userAuth)
    const { loading, userInfo } = userAuth
    const [openVent, setOpenVent] = useState(false)

    return (
        <>
            <ListItemButton onClick={() => setOpenVent(!openVent)}>
                <ListItemIcon>
                    <LocationCityIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Edificios" />
                {openVent ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openVent} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>

                    <ListItemButton component={RouterLink} to={`edificios/gestion-de-edificios/`}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Gestion de edificios" />
                    </ListItemButton>

                </List>
            </Collapse>
        </>
    )
}