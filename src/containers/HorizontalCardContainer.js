import React from "react";
import {RecipeCard} from "../components/RecipeCard";

export const HorizontalCardContainer = (props) => {
    return (
        props.loading ? <img src="../photos/loading.gif"/> :
        (props.recipes.length === 0 ? <h1>Looks like it's nothing here</h1> :
                <div className="hirizontal-cards-container">
                    {
                        props.recipes.map((recipe) => {

                            return ((recipe.isActive === undefined || recipe.isActive === true) &&
                                <RecipeCard recipe={recipe}
                                            changable={props.changeState}
                                />
                            );
                        })
                    }
                </div>
        )
    )
};