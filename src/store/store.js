import {createStore, combineReducers} from "redux";
import {loadState, saveState} from "../local-storage/localStorage";

function counterReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_CONTACT':
            return [...state, action.payload];
        case 'REMOVE_CONTACT':
            return state.filter((_, idx) => idx !== action.payload);
        case 'SAVE_EDITING_CONTACT':
            console.log(action.payload.name)
            return state.map((item, index) => {
                if (index === action.payload.selectedIndex) {
                    return {
                        ...item,
                        name: action.payload.name,
                        lastname: action.payload.lastname,
                        age: action.payload.age,
                        pager: action.payload.pager
                    }
                }
                return item;
            })
        default:
            return state
    }
}

function selectReducer(state = null, action) {
    switch (action.type) {
        case 'SELECT_INDEX':
            return action.payload;
        default:
            return state
    }
}

const persistedState = {
    contacts: loadState(),
    selectedIndex: null
}

const rootReducer = combineReducers({
    contacts: counterReducer,
    selectedIndex: selectReducer
});

export const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
    saveState(store.getState());
    console.log(store.getState())
});



