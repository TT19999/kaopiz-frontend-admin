import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';

import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import { Button, Input, TextField } from '@material-ui/core';
import { Modal } from 'react-bootstrap';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // onDeleteRequest
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
        <Link key={row.user} to={`/admin/home/userdetail/${row.user_id}`}onClick={() => localStorage.setItem("admin_user", String(row.user_id))}>{row.user}</Link>
        </TableCell>
        <TableCell align="right">
        <Link key={row.trip} to={`/admin/home/tripdetail/${row.trip_id}`}onClick={() => localStorage.setItem("admin_trip", row.trip_id)}>{row.trip}</Link>
        </TableCell>
        <TableCell align="right">
        <Link key={row.owner} to={`/admin/home/userdetail/${row.owner_id}`}onClick={() => localStorage.setItem("admin_user", String(row.owner_id))}>{row.owner}</Link>
        </TableCell>

        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>

                <Typography variant="h6" gutterBottom component="div">
                Details
                </Typography>  

              
              <Table size="small" aria-label="purchases">
                <TableBody>
                  
                <TableRow>
                    
                    <TableCell>Participants</TableCell>
                    <TableCell>{row.participants}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell>Create at</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Update at</TableCell>
                    <TableCell>{row.updated_at}</TableCell>
                  </TableRow>
                  
                    
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    // userName: PropTypes.string.isRequired,
    // createAt: PropTypes.string.isRequired,
    // Language: PropTypes.string.isRequired,
    // id: PropTypes.number.isRequired,
  }).isRequired,
};

class OrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        categories : [],
        show :false,
        name: '',
        newName:''
    }
  } 


   useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  
  componentDidMount() {
    axios({
        method: 'GET',
        url: '/api/categories',
        headers : {
          Authorization: "Bearer" + localStorage.getItem("token")
        },
        data: null
    }).then((response) => {
        // handle success
        this.setState({
            categories : response.data.categories,
        })
    }).catch((error) => {
        // handle error
        console.log(error);
    });
    }

     handleOpen = () => {
      this.setState({
        show : true
      })
    };
  
     handleClose = () => {
      this.setState({
        show : false
      })
    };

    onClickEdit= (id,name) => {
      
      axios({
        method : 'POST',
        url: '/api/categories/update',
        data : {
          id : id,
          name : name,
        },
        headers : {
          Authorization: "Bearer" + localStorage.getItem("token")
        },
      }).then(res => {
        window.location.reload()
        console.log(res)
      }).catch(err => {
        console.log(err.response)
      })
    }

    onClickDelete= (id) =>{
      axios({
        method : 'Delete',
        url: '/api/categories/delete',
        data : {
          id : id,
        },
        headers : {
          Authorization: "Bearer" + localStorage.getItem("token")
        },
      }).then(res => {
        window.location.reload()
      }).catch(err => {
        console.log(err)
      })
    }

    onClickSave = (name) => {
      axios({
        method : 'POST',
        url: '/api/categories',
        data : {
          name : name,
        },
        headers : {
          Authorization: "Bearer" + localStorage.getItem("token")
        },
      }).then(res => {
        window.location.reload()
      }).catch(err => {
        console.log(err)
      })
    }

  render() {
  return (
    <>
    <Paper>
    <Toolbar>
    <div>
        <Typography variant="h6" id="tableTitle">
          List Category
        </Typography>
        <form  noValidate autoComplete="off">
                <Input name='newName' onChange={(event)=>this.setState({newName : event.target.value})}/>
                <button type="button" onClick={()=>this.onClickSave(this.state.newName)}>
                  Save
                </button>
      </form>
    </div>
    </Toolbar>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Name</TableCell>
            <TableCell>Post</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.categories.map(category=>{
             return <TableRow> <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.posts_count}</TableCell>
              <TableCell>{category.users_count}</TableCell>
              <TableCell>
              <form  noValidate autoComplete="off">
                <Input name='name' onChange={(event)=>this.setState({name : event.target.value})}/>
                <button type="button" onClick={()=>this.onClickEdit(category.id, this.state.name)}>
                  Edit
                </button>
              </form>
                
                
              </TableCell>
              <TableCell><Button variant="contained" color="secondary" onClick={()=>this.onClickDelete(category.id)}>Delete</Button></TableCell>
              </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </>
  );
  }
}
export default OrderTable;