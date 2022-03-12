import {loginAction, removeRecipeAction} from "../store/userReduser";
import {loadAction} from "../store/coffeeReduser";
import {showAction} from "../store/recipeWidgetReducer";

export const fetchRecipes = (coffeeId) => {
       return  fetch(`https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/coffee` + `?id=` + coffeeId, {headers : {
                'X-Requested-With': 'XMLHttpRequest'
        }})
            .then(response => response.json()).then(json => json.recipes);

}

export const fetchRecipe = (id) => {
     return (dispatch) => fetch("https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/recipe?id=" + id, {headers : {
             'X-Requested-With': 'XMLHttpRequest'
         }}).then(response => response.json()
    ).then(json => {
        dispatch(showAction(json))
    })
}