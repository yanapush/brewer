import {loginAction, removeRecipeAction} from "../store/userReduser";

export const fetchUser = (username) => {
    return (dispatch) => {
        const recipeRequestOptions = {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest', 'Origin': 'https://localhost:3000/*',
                'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
                'Accept': 'application/json'
            }
        };
        fetch("https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/user?username=" + username, recipeRequestOptions).then(response => {
            console.log(response);
            return response.json()
        }).then(json => {
            console.log(json);
            dispatch(loginAction(json))
        })
    }
}

export const deleteRecipe = (id) => {
    const recipeRequestOptions = {
        method: 'DELETE',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': 'https://localhost:3000/*',
            'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json'
        }
    };
    return (dispatch) => {
        fetch(`https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/recipe?id=` + id, recipeRequestOptions)
            .then((response) => {
                dispatch(removeRecipeAction(id))
            });
    }
}

export const postLogin = (data) => {
    return (dispatch) => {
        const recipeRequestOptions = {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest', 'Origin': 'https://localhost:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        console.log(JSON.stringify(data));

        fetch("https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/api/authenticate"
            , recipeRequestOptions).then((response) => {

            console.log("response", response);
        return response.json();
        }).then(json => {sessionStorage.setItem("token", json.token);dispatch(fetchUser(data.username))});
    }
}

export const registerUser = (data) => {
    return (dispatch) => {
        const recipeRequestOptions = {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest', 'Origin': 'https://localhost:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        console.log(JSON.stringify(data));

        fetch("https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/register"
            , recipeRequestOptions).then((response) => {

            console.log("response", response);
            return response.json();
        }).then(json => {dispatch(loginAction(data))});
    }
}
