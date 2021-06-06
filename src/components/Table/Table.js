import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from "@material-ui/core";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import {useSelector, useDispatch} from 'react-redux';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
        marginTop: 10
    },
});

const RemoveButton = withStyles({
    root: {
        borderRadius: 3,
        border: 0,
        color: 'black',
        minWidth: 40,
        height: 20,
        marginBottom: 10,
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const EditButton = withStyles({
    root: {
        borderRadius: 3,
        border: 0,
        color: 'black',
        minWidth: 40,
        height: 20,
        marginBottom: 10,
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);


const StyledTableCell = withStyles({
    head: {
        backgroundColor: '#C0D9D9',
        color: 'white'
    },
})(TableCell);


export default function CustomTable({setOpen}) {

    const contacts = useSelector(state => state.contacts);
    const dispatch = useDispatch();
    const classes = useStyles();

    const captions = contacts.length && Object.keys(contacts[0]).map((caption, idx) =>
        <StyledTableCell
            key={idx}
            align="center"
        >
            {caption.replace(caption[0], caption[0].toLocaleUpperCase())}
        </StyledTableCell>);


    const removeContact = (idx) => {
        dispatch({
            type: 'REMOVE_CONTACT',
            payload: idx
        })
    };

    const editContact = (idx) => {
        setOpen(true);
        dispatch({
            type: 'SELECT_INDEX',
            payload: idx
        })
    };

    return (
        contacts.length ? <TableContainer component={Paper}>
            <Table
                className={classes.table}
                size="medium"
                aria-label="customized table"
            >
                <TableHead>
                    <TableRow variant="head">
                        {captions}
                        <StyledTableCell
                            align="center"
                        >
                            Edit
                        </StyledTableCell>

                        <StyledTableCell
                            align="center"
                        > Remove

                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {contacts.map((row, idx) => (
                        <TableRow key={idx}
                                  hover={true}
                        >

                            {Object.values(row).map((value, index) => <TableCell
                                key={index}
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {value}

                            </TableCell>)
                            }


                            <TableCell align="center">
                                <EditButton className={classes.button}
                                            onClick={() => editContact(idx)}
                                >
                                    <EditTwoToneIcon/>
                                </EditButton>
                            </TableCell>

                            <TableCell align="center">
                                <RemoveButton className={classes.button}
                                              onClick={() => removeContact(idx)}
                                >
                                    <DeleteTwoToneIcon/>
                                </RemoveButton>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer> : null

    )
}