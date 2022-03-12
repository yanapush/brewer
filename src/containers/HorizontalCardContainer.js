import React from "react";
import {RecipeCard} from "../components/RecipeCard";

export const HorizontalCardContainer = (props) => {
    return (
        !props.loading &&
        (props.recipes.length === 0 ? <h1>Looks like it's nothing here</h1> :
                <div className="hirizontal-cards-container">
                    {
                        props.recipes.map((recipe) => {

                            return ((recipe.isActive === undefined || recipe.isActive === true) &&
                                <RecipeCard id={recipe.id}
                                            brewType={recipe.brewer}
                                            name={recipe.recipe_name}
                                            weight={recipe.coffee_weight}
                                            volume={recipe.water_volume}
                                            temperature={recipe.water_temperature}
                                            characteristics={recipe.characteristics}
                                            description={recipe.description}
                                            changable={props.changeState}
                                />
                            );
                        })
                    }
                </div>
        )
    )
};