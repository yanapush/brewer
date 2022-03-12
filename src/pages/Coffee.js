import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {HorizontalCardContainer} from "../containers/HorizontalCardContainer";
import {fetchRecipes} from "../asyncActions/recipes";

export default function Coffee() {

    const coffee_id = useParams().id;
    const [activeRecipes, setActiveRecipes] = React.useState({recipes: [], isFetching: false, isLoaded: false});
    const coffeeReducer = useSelector(state => state.coffeeReducer);
    const userReducer = useSelector(state => state.userReducer);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setActiveRecipes(prev => {
            return {...prev, isFetching: true}
        });
        const response = await fetchRecipes(coffee_id);
        setActiveRecipes({
            recipes: response.map(recipe => {
                if (recipe.author.username === userReducer.username) {
                    return {...recipe, isActive : true};
                } else {
                    return {...recipe, isActive : false};
                }
            }),
            isFetching: false,
            isLoaded: true
        })
    };

    const getCurrentRecipes = (recipes) => {
        return recipes.map(recipe => {
            if (recipe.author.username === userReducer.username) {
                return {...recipe, isActive: true};
            } else {
                return {...recipe, isActive: false};
            }
        });
    }

    const getDefaultRecipes = (recipes) => {
        return recipes.map(recipe => {
            if (recipe.author.username === "yanapush") {
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

    return !coffeeReducer.loading && !userReducer.loading && activeRecipes.isLoaded && (
        <div>
            <h1>{coffeeReducer.coffee.find(item => item.id === coffee_id).coffee_name}</h1>
            <div className="selector-container">

                <div className="selector__item" onClick={() => setActiveRecipes(prev => {
                    return activeRecipes.recipes !== undefined ?
                        {
                            ...prev,
                            recipes: getCurrentRecipes(prev.recipes)
                        } : prev
                })}>
                    <p>yours</p>
                </div>

                <div className="selector__item" onClick={() => setActiveRecipes(prev => {
                    return activeRecipes.recipes !== undefined ?
                        {
                            ...prev,
                            recipes: getDefaultRecipes(prev.recipes)
                        } : prev
                })}><p>recommended</p></div>

                <div className="selector__item" onClick={() => setActiveRecipes(prev => {
                    return activeRecipes.recipes !== undefined ?
                        {
                            ...prev,
                            recipes: getCommunityRecipes(prev.recipes)
                        } : prev
                })}><p>community</p></div>
            </div>
            {(activeRecipes.recipes !== undefined && activeRecipes.recipes.filter(recipe => recipe.isActive).length !== 0) ?
                <HorizontalCardContainer loading={!activeRecipes.isLoaded} recipes={activeRecipes.recipes}/> :
                <h1>Looks like it's nothing here</h1>}
        </div>
    );
}