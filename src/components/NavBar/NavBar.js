import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  // Retrieve the role from localStorage
  const userRole = localStorage.getItem("role");

  // Logout function
  const handleLogout = () => {
    // Clear localStorage or any session data
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");

    // Redirect to the login page
    navigate("/login");
  };

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
          {userRole === "STUDENT" && (
            // Show only the College Portals for student
            <ListItem button onClick={() => onMenuClick("portal")}>
              <ListItemText primary="College Portals" />
            </ListItem>
          )}

          {userRole === "UNIVERSITY" && (
            <>
              {/* Show both College Portals and College Registration for university */}
              <ListItem button onClick={() => onMenuClick("register")}>
                <ListItemText primary="College Registration" />
              </ListItem>
              <ListItem button onClick={() => onMenuClick("portal")}>
                <ListItemText primary="College Portals" />
              </ListItem>
            </>
          )}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleLogout} // Logout and navigate to login page
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Navbar;
