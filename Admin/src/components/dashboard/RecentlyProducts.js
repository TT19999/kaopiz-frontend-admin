import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import { cyan } from "@material-ui/core/colors";
import Wallpaper from "@material-ui/icons/Wallpaper";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: 300,
    backgroundColor: cyan[600],
    color: "white"
  }
};
class RecentlyProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, data } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);



    return (
      <Paper>
        <List
          subheader={
            <ListSubheader classes={{ root: classes.subheader }}>Recent Posts</ListSubheader>
          }
        >
          {this.props.data.map((item, idx) => (
            <ListItem key={idx}>
              <Avatar style={{ marginRight: "10px" }}>
                <Wallpaper />
              </Avatar>
              <ListItemText primary={item.title} secondary={item.author} />
              <ListItemSecondaryAction>
                  <div>
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <MoreVertIcon color={"action"} />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
                    <Link to={`/admin/home/postdetail/`+item.id}>View</Link>
                  </Menu>
                  </div>  
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

RecentlyProducts.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object
};

export default withStyles(styles)(RecentlyProducts);
