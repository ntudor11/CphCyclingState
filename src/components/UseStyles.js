import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

export default useStyles;
