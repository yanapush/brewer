import {loadAction} from "../store/coffeeReduser";

export const fetchCoffee = (dispatch) => {
        fetch("https://brewer-app.herokuapp.com/coffee").then(response => {
            return response.json()
        }
        ).then(json => {
                dispatch(loadAction(json))
        })
}