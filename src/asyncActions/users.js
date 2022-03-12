import {loginAction, removeRecipeAction} from "../store/userReduser";

export const fetchUser = (username) => {
    return (dispatch) => {
        fetch("https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/user?username=" + username).then(response => response.json()).then(json => dispatch(loginAction(json)))
    }
}

export const deleteRecipe = (id) => {
    return (dispatch) => {
        fetch(`https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/recipe?id=` + id, { method: 'DELETE'})
            .then((response) => {dispatch(removeRecipeAction(id))});
    }
}