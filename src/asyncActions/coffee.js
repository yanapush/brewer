import {loadAction} from "../store/coffeeReduser";
import {useSelector} from "react-redux";

export const fetchCoffee = (dispatch, token) => {
        return (dispatch) => {
                console.log(token);
                const recipeRequestOptions = {
                        headers: {
                                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                                'Content-Type': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest',
                                'Origin': 'http://localhost:3000/main'
                        },
                };
                fetch("https://cors-anywhere.herokuapp.com/https://brewer-app.herokuapp.com/coffee", recipeRequestOptions).then(response => {
                            return response.json();
                    }
                ).then(json => {
                        console.log(json);
                        dispatch(loadAction(json))
                })
        }
}
