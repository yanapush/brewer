
import {deleteRecipe} from "../asyncActions/users";
import {useDispatch} from "react-redux";
import React from "react";
import {fetchRecipe} from "../asyncActions/recipes";

export const RecipeCard = (props) => {
    const dispatch = useDispatch();
   return (
        <div className="recipe">
            <div className="card-content"
                 recipe_id={props.id}
                 onClick= {(e) => dispatch(fetchRecipe(e.currentTarget.getAttribute("recipe_id")))}>

                <img className="recipe-icon" src={'../photos/' + props.brewType + '.png'}/>

                {props.changable && <button onClick={(e) => {dispatch(deleteRecipe(e.currentTarget.parentNode.getAttribute("recipe_id")))}}>Delete</button>}

                <h2>{ props.name }</h2>
                <p>{ props.weight }</p>
                <p>{ props.volume }</p>
                <p>{ props.temperature }</p>
                <p>{ props.characteristics }</p>
                <p>{ props.description }</p>
            </div>
        </div>
    )};

