import React, {useEffect} from "react";
import {VerticalCardContainer} from "../containers/VerticalCardsContainer";
import {HorizontalCardContainer} from "../containers/HorizontalCardContainer";
import {useDispatch, useSelector} from "react-redux";
import "../style/main.css"
import {fetchUser} from "../asyncActions/users";
import {fetchCoffee} from "../asyncActions/coffee";

export default function Main() {
    const dispatch = useDispatch();
    const [recipesChange, setRecipesChange] = React.useState(false);
    const user = useSelector(state =>  state.userReducer)

    useEffect(() => {
        dispatch(fetchUser("yanapush"));
        dispatch(fetchCoffee());
    }, []);
    return user.loading ? <img className="loading-gif" src="../photos/loading.gif"/> :
        (<>
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
                    <button className="img-button" onClick={() => {
                        setRecipesChange(state => !state);
                    }}> <img className="icon" src="../photos/change.png"/> </button>
                </div>
                <HorizontalCardContainer loading={user.loading} recipes={user.recipes} changeState={recipesChange}/>
            </div>
        </>
    );
}
