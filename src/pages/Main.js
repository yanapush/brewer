import React from "react";
import {VerticalCardContainer} from "../containers/VerticalCardsContainer";
import {HorizontalCardContainer} from "../containers/HorizontalCardContainer";
import {useSelector} from "react-redux";

export default function Main() {
    const [recipesChange, setRecipesChange] = React.useState(false);
    const user = useSelector(state =>  state.userReducer)
    return !user.loading &&
        (<div>
            <div className="container">
                <h1>
                    Coffee
                </h1>
                <VerticalCardContainer />
            </div>
            <div className="container">
                <div className="recipes-container__header">
                    <h1>
                        Your recipes
                    </h1>
                    <button onClick={() => {
                        setRecipesChange(state => !state);
                    }}> Change </button>
                </div>
                <HorizontalCardContainer loading={user.loading} recipes={user.recipes} changeState={recipesChange}/>
            </div>
        </div>
    );
}