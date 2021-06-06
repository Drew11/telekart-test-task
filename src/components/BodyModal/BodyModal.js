import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import './BodyModal.css';

function BodyModal(props) {

    const {contacts, selectedIndex} = useSelector(state => state);
    const [contact] = useState(contacts[selectedIndex]);
    const dispatch = useDispatch();

    console.log(contact)
    const saveContact = (evt) => {
        evt.preventDefault();
        const name = evt.target['name'].value.trim();
        const lastname = evt.target['lastname'].value.trim();
        const age = evt.target['age'].value.trim();
        const pager = evt.target['pager'].value.trim();

        if (name !== '' && lastname !== '' && age !== '' && pager !== '') {

            if (selectedIndex !== null) {
                dispatch({
                    type: 'SAVE_EDITING_CONTACT',
                    payload: {
                        selectedIndex,
                        name,
                        lastname,
                        age,
                        pager
                    }
                })
            } else {
                dispatch({
                    type: 'ADD_CONTACT',
                    payload: {
                        name,
                        lastname,
                        age: +age,
                        pager: +pager
                    }
                });
            }

            props.handleClose();
        }
    }

    return (
        <div className="add">
            <form onSubmit={saveContact}>
                <TextField
                    id="standard-basic"
                    label="Name"
                    name="name"
                    defaultValue={contact && contact.name}
                    required
                />

                <TextField
                    id="standard-basic"
                    label="LastName"
                    required
                    name="lastname"
                    defaultValue={contact && contact.lastname}
                />

                <TextField
                    id="standard-basic"
                    type="number"
                    required
                    label="Age"
                    name="age"
                    defaultValue={contact && contact.age}
                />

                <TextField
                    defaultValue={contact && contact.pager}
                    type="number"
                    id="standard-basic"
                    required
                    label="Pager"
                    name="pager"
                />

                <input type="submit" value={!contact?"Save Contact": "Save Changes"}/>
            </form>
        </div>
    );
}

export default BodyModal;