import React from "react";
import {useSelector} from "react-redux";


export default function BrewTypeFormContainer(props) {
    const brew_types = ["v60", "turka", "press", "siphon"];
    const form = useSelector(state => state.addRecipeFormReducer);
    const brewOption = (brew_type) => {
        return   (<div className="option">
            <input type="radio"
                   name="brewer"
                   id={brew_type}
                   value={brew_type}
                   onChange={props.handle}
                   checked={form.formData.brewer !== undefined && form.formData.brewer === brew_type}/>
            <label htmlFor={brew_type} aria-label={brew_type}>
                <img src={"./photos/" + brew_type + ".png"}/>
                {brew_type}
            </label>
        </div>);
    }

    return (<div className="brew-type-container">
        {brew_types.map(brew_type => brewOption(brew_type))};
    </div>);
}