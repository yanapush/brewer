
import {deleteRecipe} from "../asyncActions/users";
import {useDispatch} from "react-redux";
import React from "react";
import {fetchRecipe} from "../asyncActions/recipes";
import {showFormAction} from "../store/addRecipeFormReducer";

export const RecipeCard = (props) => {
    const dispatch = useDispatch();
   return (
        <div className="recipe">
            <div className="card-content"
                 recipe_id={props.recipe.id}
                 onClick= {(e) => dispatch(fetchRecipe(e.currentTarget.getAttribute("recipe_id")))}>

                <img className="recipe-icon" src={'../photos/' + props.recipe.brewer + '.png'}/>

                <h2>{ props.recipe.recipe_name }</h2>
                <p>{ props.recipe.coffee_weight }</p>
                <p>{ props.recipe.water_volume }</p>
                <p>{ props.recipe.water_temperature }</p>
                <p>{ props.recipe.description }</p>
            </div>
            {props.changable && <div className="button-container">
                <button className="img-button" onClick={(e) => {dispatch(deleteRecipe(props.recipe.id)); e.stopPropagation()}}><img className="icon" src="../photos/delete.png"/></button>
                <button className="img-button" onClick={(e) => {dispatch(showFormAction(props.recipe)); e.stopPropagation();}}><img className="icon" src="../photos/change.png"/></button>
            </div>}
        </div>
    )};

