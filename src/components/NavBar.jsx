import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import MapIcon from "@material-ui/icons/Map";
import BarChartIcon from "@material-ui/icons/BarChart";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <NavLink
            exact
            activeClassName="active"
            to="/"
            className="ml-auto nav-link underline-from-center"
          >
            <ListItemText> Bike Lanes Map </ListItemText>
          </NavLink>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <NavLink
            exact
            activeClassName="active"
            to="/weather"
            className="ml-auto nav-link underline-from-center"
          >
            <ListItemText>Weather Stats</ListItemText>
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  const anchor = "left";

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(anchor, true)}>
          <MenuIcon />
        </Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
