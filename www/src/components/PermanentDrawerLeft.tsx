import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { faPaw, faQuestionCircle, faSyringe, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const drawerWidth = 220;

export default function PermanentDrawerLeft() {
  function getIcon(index: number){
    switch(index){
      case 0:
        return faPaw
      case 1:
        return faSyringe
      case 2:
        return faCalendarCheck
      default:
        return faQuestionCircle
    }
  }

  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          zIndex: 0,
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {['Pets', 'Immunizations', 'Appointments'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FontAwesomeIcon icon={ getIcon(index) } />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}