import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import BodyModal from '../BodyModal/BodyModal'
import {Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import './Modal.css';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const CloseButton = withStyles({
    root: {
        borderRadius: 3,
        border: 0,
        color: 'white',
        minWidth: 20,
        height: 20,
        marginBottom: 10,
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default function SimpleModal({open, setOpen}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({
            type: 'SELECT_INDEX',
            payload: null
        })
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="cls-button-wrapper">
                <CloseButton
                    onClick={handleClose}
                    color="primary"
                    variant="contained"
                >
                    &#10006;
                </CloseButton>
            </div>
            <BodyModal
                handleClose={handleClose}
            />
        </div>
    );

    return (
        <div className="wrapper-modal">
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpen}>
                Add contact
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                disableBackdropClick={true}
            >
                {body}
            </Modal>
        </div>
    );
}