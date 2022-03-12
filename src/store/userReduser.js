const defaultState = {
    loading : true
}

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADD_RECIPE = "ADD_RECIPE";
const REMOVE_RECIPE = "REMOVE_RECIPE";

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN" : { console.log(action.payload); return {...action.payload, loading : false}}
        case "LOGOUT" :  { console.log(state); return "";}
        case "ADD_RECIPE" : return {...state, recipes: [...state.recipes, action.payload]};
        case "REMOVE_RECIPE" : {
            console.log(action.payload);
            console.log(state);
            return {...state, recipes: state.recipes.filter(recipe => recipe.id != action.payload)};
        }
        default: return state;
    }
}

export const loginAction = (payload) => ({type : LOGIN, payload: payload});
export const logoutAction = (payload) => ({type : LOGOUT, payload: payload});
export const addRecipeAction = (payload) => ({type : ADD_RECIPE, payload: payload});
export const removeRecipeAction = (payload) => ({type : REMOVE_RECIPE, payload: payload});


