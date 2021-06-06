import data from "../data/data.json";

export const loadState = () => {
    try {
        const serializedState = JSON.parse(window.localStorage.getItem('state'));

        if (serializedState === null) {
            return data
        }

        if (serializedState.length === 0) {
            return data
        }

        return serializedState;
    } catch (err) {
        //console.log(data)
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state.contacts);
        window.localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};