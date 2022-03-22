import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {HorizontalCardContainer} from "../containers/HorizontalCardContainer";
import {fetchRecipes} from "../asyncActions/recipes";

export default function Coffee() {

    const coffee_id = useParams().id;
    const [activeRecipes, setActiveRecipes] = React.useState({recipes: [], isFetching: false, isLoaded: false});
    const coffeeReducer = useSelector(state => state.coffeeReducer);
    const userReducer = useSelector(state => state.userReducer);

    useEffect(() => {
        fetch().then(console.log("reloaded coffee page"));
    }, [userReducer, coffeeReducer]);

    const fetch = async () => {
        setActiveRecipes(prev =>  ({...prev, isFetching: true}));
        const response = await fetchRecipes(coffee_id);
        console.log(response)
        setActiveRecipes({recipes : getCurrentRecipes(response),
            isFetching: false,
            isLoaded: true
        });
    };

    const getCurrentRecipes = (recipes) => {
        console.log(recipes);
        return recipes.map(recipe => {
            if (recipe.author.username === userReducer.username) {
                console.log(recipe)
                return {...recipe, isActive: true};
            } else {
                return {...recipe, isActive: false};
            }
        });
    }

    const getDefaultRecipes = (recipes) => {
        return recipes.map(recipe => {
            if (recipe.author.username === userReducer.username) {
                return {...recipe, isActive: true};
            } else {
                return {...recipe, isActive: false};
            }
        });
    }

    const getCommunityRecipes = (recipes) => {
        return recipes.map(recipe => {
            if (recipe.author.username !== userReducer.username) {
                return {...recipe, isActive: true};
            } else {
                return {...recipe, isActive: false};
            }
        });
    }

    const [activeSelector, setActive] = useState("yours");

    console.log(!coffeeReducer.loading);
    console.log(!userReducer.loading);
    console.log(activeRecipes.isLoaded);
    return (coffeeReducer.loading || userReducer.loading || !activeRecipes.isLoaded) ? <img className="loading-gif" src="../photos/loading.gif"/> : (
        <div>
            <h1>{coffeeReducer.coffee.find(item => item.id == coffee_id).coffee_name}</h1>
            <div className="selector-container">

                <div className={activeSelector === "yours" ? "selector__item active-selector" : "selector__item"} name={"yours"} onClick={(e) => {setActive("yours"); setActiveRecipes(prev => {
                    return activeRecipes.recipes !== undefined ?
                        {
                            ...prev,
                            recipes: getCurrentRecipes(prev.recipes)
                        } : prev
                })}}>
                    <p>yours</p>
                </div>

                <div className={activeSelector === "recommended" ? "selector__item active-selector" : "selector__item"} name={"recommended"} onClick={() => { setActive("recommended"); setActiveRecipes(prev => {
                    return activeRecipes.recipes !== undefined ?
                        {
                            ...prev,
                            recipes: getDefaultRecipes(prev.recipes)
                        } : prev
                })}}><p>recommended</p></div>

                <div className={activeSelector === "community" ? "selector__item active-selector" : "selector__item"} name={"community"} onClick={() => { setActive("community");setActiveRecipes(prev => {
                    return activeRecipes.recipes !== undefined ?
                        {
                            ...prev,
                            recipes: getCommunityRecipes(prev.recipes)
                        } : prev
                })}}><p>community</p></div>
            </div>
            {(activeRecipes.recipes !== undefined && activeRecipes.recipes.filter(recipe => recipe.isActive).length !== 0) ?
                <HorizontalCardContainer loading={!activeRecipes.isLoaded} recipes={activeRecipes.recipes}/> :
                <h1>Looks like it's nothing here</h1>}
        </div>
    );
}