import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addCharacteristicsAction,
    hideFormAction,
    hideStepsFormAction,
    showFormAction,
    showStepsFormAction, submitFormAction,
    updateFormAction
} from "../store/addRecipeFormReducer";
import {useEffect} from "react";
import {submitRecipe} from "../asyncActions/recipes";
import BrewTypeFormContainer from "../containers/BrewTypeFormContainer";
import CoffeeFormContainer from "../containers/CoffeeFormContainer";
import {upload} from "@testing-library/user-event/dist/upload";
import {userReducer} from "../store/userReduser";


export default function AddRecipeForm(props) {
    const form = useSelector(state => state.addRecipeFormReducer);
    const [step, setStep] = React.useState({duration: "0:00", start_second: "0:00", step_name : ""});
    const coffeeReducer = useSelector(state => state.coffeeReducer);
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [characteristic, setCharacterisic] = useState(form.formData.characteristic !== undefined ? form.formData.characteristic : {});

    useEffect(() => dispatch(showFormAction(props.recipe)), []);

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        console.log("changed field " + name);
        console.log(value);
        if (name === "coffee" && value === undefined) {
            return
        }
        dispatch(updateFormAction({"name": [name], "value": type === "checkbox" ? checked : value}));
    }

    function handleCharChange(event) {
        const {name, value} = event.target
                setCharacterisic( prev => ({...prev,  [name] : value}));
    }

    function handleStepChange(event) {
        const {name, value} = event.target
        setStep(prev => ({...prev, [name]: value}));
    }

    const onBlur = (event) => {
        const {name, value} = event.target
        const seconds = Math.max(0, getSecondsFromHHMMSS(value));

        const time = toHHMMSS(seconds);
        setStep(prev => ({...prev, [name]: time}));
    };

    const getSecondsFromHHMMSS = (value) => {
        const [str1, str2, str3] = value.split(":");

        const val1 = Number(str1);
        const val2 = Number(str2);
        const val3 = Number(str3);

        if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
            return val1;
        }

        if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
            return val1 * 60 + val2;
        }

        if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
            return val1 * 60 * 60 + val2 * 60 + val3;
        }

        return 0;
    };

    const toHHMMSS = (secs) => {
        const secNum = parseInt(secs.toString(), 10);
        const hours = Math.floor(secNum / 3600);
        const minutes = Math.floor(secNum / 60) % 60;
        const seconds = secNum % 60;

        return [hours, minutes, seconds]
            .map((val) => (val < 10 ? `0${val}` : val))
            .filter((val, index) => val !== "00" || index > 0)
            .join(":")
            .replace(/^0/, "");
    };


    const submitForm = (event) => {
        event.preventDefault();
        if (form.formData.author.username !== userReducer.username) {
            form.formData.author = {};
            form.formData.id = undefined;
        }

        if (form.formData.coffee.id === undefined) {
            form.formData.coffee = coffeeReducer.coffee.find(coffee => coffee.id == form.formData.coffee)
        }
        if (form.formData.id !== undefined) {
            form.formData.characteristic = characteristic;
        }
        dispatch(submitRecipe(form.formData));
    }

    const stepFormSubmit = (event) => {
        event.preventDefault();
        form.formData.steps.push(step);
        dispatch(hideStepsFormAction());

    }

    return (
        <div className="widget add-form">
            <div className="close-container">
                <button className="img-button" onClick={() => {
                    dispatch(hideFormAction())
                }}><img className="icon" src="../photos/close.webp"/>
                </button>
            </div>
            <form onSubmit={submitForm}>
                <p>recipe name</p>
                <br/>
                <input
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    name="recipe_name"
                    value={form.formData.recipe_name}
                />
                <div className="first-row">
                    <BrewTypeFormContainer handle={handleChange}/>
                    <CoffeeFormContainer handle={handleChange}/>
                </div>
                <div className="desc-container">
                    <div className="desc-item">
                        <p> coffee weight</p>
                        <input
                            type="text"
                            placeholder=""
                            onChange={handleChange}
                            name="coffee_weight"
                            value={form.formData.coffee_weight}
                        />
                    </div>
                    <div className="desc-item">
                        <p> water volume</p>
                        <input
                            type="text"
                            placeholder=""
                            onChange={handleChange}
                            name="water_volume"
                            value={form.formData.water_volume}
                        />
                    </div>
                    <div className="desc-item">
                        <p>water temperature</p>
                        <input
                            type="text"
                            placeholder=""
                            onChange={handleChange}
                            name="water_temperature"
                            value={form.formData.water_temperature}
                        />
                    </div>
                </div>
                <div className="steps-container">
                    <h1>Steps</h1>
                    {form.formData.steps === undefined && <h2> No steps</h2>}
                    {form.formData.steps !== undefined && form.formData.steps.length !== 0 &&
                    <div className="steps">
                        <div className="step">
                            <p>{form.formData.steps.map(step => step.step_name)}</p>
                        </div>
                    </div>}

                    {form.stepsFormData !== undefined && form.stepsFormData.isShown &&
                    <div>
                        <div className="close-container">
                            <button type="button" onClick={() => {
                                dispatch(hideStepsFormAction())
                            }}>close
                            </button>
                        </div>
                        <form className="steps-form">
                            <input
                                type="text"
                                placeholder=""
                                onChange={handleStepChange}
                                name="step_name"
                                value={step.step_name}
                            />
                            <input
                                type="text"
                                placeholder=""
                                onChange={handleStepChange}
                                name="start_second"
                                onBlur={onBlur}
                                value={step.start_second}
                            />
                            <input
                                type="text"
                                placeholder=""
                                onChange={handleStepChange}
                                name="duration"
                                onBlur={onBlur}
                                value={step.duration}
                            />
                            <input
                                type="text"
                                placeholder=""
                                onChange={handleStepChange}
                                name="water_volume"
                                value={step.water_volume}
                            />
                            <input
                                type="text"
                                placeholder=""
                                onChange={handleStepChange}
                                name="description"
                                value={step.description}
                            />
                            <button type="submit" onClick={(e) => {
                                stepFormSubmit(e)
                            }}>save
                            </button>
                        </form>
                    </div>
                    }
                    <button className="secondary-button" type="button"
                            onClick={(e) => dispatch(showStepsFormAction())}>Add
                    </button>
                </div>

                {form.formData.id !== undefined && (
                <div className="characteristics-container">
                    <h1>Characteristics</h1>
                    <div className="characteristics-row">
                        <p>{"sweetness: "}</p>
                        <input
                            type="text"
                            placeholder=""
                            onChange={handleCharChange}
                            name="sweetness"
                            value={characteristic === null ? "" : characteristic.sweetness}
                        />
                        <br/>
                        <p>{"bitterness: "}</p>
                        <input
                            type="text"
                            placeholder=""
                            onChange={handleCharChange}
                            name="acidity"
                            value={characteristic === null ? "" : characteristic.acidity}
                        />
                        <br/>
                    </div>
                    <div className="characteristics-row">
                        <p>{"acidity: "}</p>
                        <input
                            type="text"
                            placeholder=""
                            onChange={handleCharChange}
                            name="bitterness"
                            value={characteristic === null ? "" : characteristic.bitterness}
                        />
                        <br/>
                        <p>{"density: "}</p>
                        <input
                            type="text"
                            placeholder=""
                            onChange={handleCharChange}
                            name="density"
                            value={characteristic === null ? "" : characteristic.density}
                        />
                    </div>

                </div> )}
                {(
                <div>
                    <h1>Description</h1>
                    <textarea
                        value={form.formData.description}
                        placeholder="Write something about your recipe..."
                        onChange={handleChange}
                        name="description"
                    />
                </div>
                )}
                <br/>
                <br/>
                <button type="submit" className="main-button">Submit</button>
            </form>
        </div>);
}