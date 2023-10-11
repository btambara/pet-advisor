import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import '../App.css';
import axios from "axios";

const pages = ['Dashboard'];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  let showButtons = false;
  if(sessionStorage.getItem("apiKey")){
    showButtons = true;
  }
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    let data = new FormData();
    let apiKey = sessionStorage.getItem("apiKey")

    if(apiKey){
      data.append('token', apiKey);
      sessionStorage.setItem("apiKey", "");

      axios({
          url: "http://localhost:8000/o/revoke_token/",
          method: "POST",
          headers: {
              Authorization: "Basic NGhFS1pkVVIyeUFPbzdSM3A5MjFlZWFIbkF4ZzhBUGZYRUtOUXdqbjo4ZUNxc2o3OEtaSVg2QnZwVmNjZVZZVFRWZW8wN0tnZ244MHAxT3VKYzViWWJQZHdRd0F3SGJBWjJXTExrc29CZzVsYXF5YjlYR2VGMUlGSTc5YjROQmNDM09zQ093SGNnb2pZU2pCUzFHMDZvczRDMWNOVzZFTGo4emZvdzFtSw==",
          },
          data: data,
      })
          .then(() => {
              window.location.replace("/login");
          })
          .catch((err) => {
              console.log(err.message);
          });
    }
  }

  return (
    <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <FontAwesomeIcon icon={faPaw} size="2x" style={{ paddingRight: 4}}/>    
          </Box> 
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PET ADVISOR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              { showButtons && pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              { showButtons && <MenuItem onClick={ logout }>Logout</MenuItem> }
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <FontAwesomeIcon icon={faPaw} size="2x" style={{ paddingRight: 4}}/>  
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PET ADVISOR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            { showButtons && pages.map((page) => (
              <Button
                key={page}
                href={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            { showButtons && <Button onClick={ logout } sx={{ my: 2, color: 'white', display: 'block' }}>Logout</Button> }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}