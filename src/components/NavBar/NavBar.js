import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = ({ onMenuClick, onLogout }) => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column" }}>
      {/* Toolbar Title */}
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
          EduSphere
        </Typography>
      </Toolbar>

      {/* Menu List */}
      <Box sx={{ flexGrow: 1 }}>
        <List>
          <ListItem button onClick={() => onMenuClick("register")}>
            <ListItemText primary="College Registration" />
          </ListItem>
          <ListItem button onClick={() => onMenuClick("portal")}>
            <ListItemText primary="College Portals" />
          </ListItem>
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onLogout} // Callback for logout action
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Navbar;