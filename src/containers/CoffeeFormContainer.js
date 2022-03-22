import React from "react";
import {useSelector} from "react-redux";

export default function CoffeeFormContainer(props) {
    const coffeeReducer = useSelector(state => state.coffeeReducer);
    const form = useSelector(state => state.addRecipeFormReducer);
    const coffeeOption = (coffee) => {
        console.log("coffee in form is ")
        console.log(form.formData.coffee);
        console.log("generated coffee is ")
        console.log(coffee);
        if (form.formData.coffee !== undefined && form.formData.coffee.id === coffee.id) {
            console.log("coffee was checked")
        }
        let isDefined = form.formData.coffee !== undefined;
        if (isDefined) {
            isDefined = (form.formData.coffee.id === undefined ? form.formData.coffee == coffee.id :  form.formData.coffee.id == coffee.id);
        }
        return (<div className="option">
                <input type="radio"
                       name="coffee"
                       id={coffee.id}
                       value={coffee.id}
                       onChange={props.handle}
                       checked={isDefined}
                     />
                <label htmlFor={coffee.id} aria-label={coffee.id}>
                    <img src="./photos/press.png"/>
                    {coffee.coffee_name}
                </label>
            </div>
        );
    }
    return coffeeReducer.coffee !== undefined && (
         <div className="brew-type-container">
            {coffeeReducer.coffee.map(coffee => coffeeOption(coffee))};
        </div>)
};