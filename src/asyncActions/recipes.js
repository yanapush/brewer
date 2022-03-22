import {addRecipeAction, loginAction, removeRecipeAction, setRecipesAction, userReducer} from "../store/userReduser";
import {coffeeReducer, loadAction} from "../store/coffeeReduser";
import {showAction} from "../store/recipeWidgetReducer";
import {submitFormAction} from "../store/addRecipeFormReducer";
import {useSelector} from "react-redux";
import {fetchUser} from "./users";

export const fetchRecipes = (coffeeId) => {
    const recipeRequestOptions = {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest', 'Origin': 'https://localhost:3000/*',
            'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json'
        }
    };
       return fetch(`https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/coffee` + `?id=` + coffeeId, recipeRequestOptions)
            .then(response => response.json()).then(json => json.recipes);
}

export const fetchUserRecipes = () => {
    const recipeRequestOptions = {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest', 'Origin': 'https://localhost:3000/*',
            'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json'
        }
    };
    return  (dispatch) => fetch(`https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/recipe/user`,  recipeRequestOptions)
        .then(response => response.json()).then(json => dispatch(setRecipesAction(json)));
}

export const fetchRecipe = (id) => {
    const recipeRequestOptions = {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest', 'Origin': 'https://localhost:3000/*',
            'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
            // 'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
     return (dispatch) => fetch("https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/recipe?id=" + id, recipeRequestOptions).then(response => response.json()
    ).then(json => {
        dispatch(showAction(json))
    })
}

export const submitRecipe = (recipe) => {
    return (dispatch) => {
        if (recipe.characteristic !== undefined && recipe.characteristic !== null) {
            recipe.characteristic.id = recipe.id;
        }
        const recipeRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Origin' : 'http://localhost:3000/main',
                'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
            },
            body: JSON.stringify(recipe)
        };
        console.log(JSON.stringify(recipe))
        fetch("https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/recipe", recipeRequestOptions).then(r =>{
                console.log(r);
                if (recipe.id === undefined) {
                    dispatch(fetchUserRecipes());
                }
                dispatch(submitFormAction());
            }
        );
    }
}
