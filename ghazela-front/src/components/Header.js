import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCalendarDays } from '@fortawesome/free-solid-svg-icons';


 
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="appbarMain">
        <Toolbar>
          <Grid container justifyContent="center"
  alignItems="center">
          <Grid item xs={8} >
         <img className="logo" src="https://media-exp1.licdn.com/dms/image/C560BAQGPcH7P98yRfg/company-logo_200_200/0/1519896761265?e=2147483647&v=beta&t=bAr3a-fgKB1SLq0NFdgOkD-yq5LquejFi-hr-fEaAvI" alt='logo' />
        
        </Grid>
        <Grid item xs={4}>
        <a className="a" href="/add">Ajouter une formation &nbsp; <FontAwesomeIcon color="#FFFFFF" icon={faPen} />  </a>
        <a className="a"  href="/planning">&nbsp;&nbsp;Planning &nbsp; <FontAwesomeIcon color="#FFFFFF" icon={faCalendarDays} />  </a>
        </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;