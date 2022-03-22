const LOAD_COFFEE = "LOAD_COFFEE";

const defaultState = {
loading : true
}

export const coffeeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOAD_COFFEE" : {
            return { coffee : action.payload, loading: false};
        }
        default: return state;
    }
}

export const loadAction = (payload) => ({type : LOAD_COFFEE, payload: payload});
