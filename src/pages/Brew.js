import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showFormAction} from "../store/addRecipeFormReducer";
import Main from "./Main";

export default function Brew() {
    const dispatch = useDispatch();
    const [isFinished, setIsFinished] = useState(false);

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

    const recipeReducer = useSelector(state => state.recipeWidgetReducer);
    const recipe = recipeReducer.recipe;

    const steps = recipe.steps;
    const steps_duration = [];

    if (steps !== undefined && steps.length !== 0) {
        steps_duration.push({
            name: steps[0].step_name,
            start_sec: getSecondsFromHHMMSS(steps[0].start_second),
            duration: getSecondsFromHHMMSS(steps[0].duration),
            description: steps[0].description
        });
        for (let i = 1; i < steps.length; ++i) {
            const new_step = {
                name: steps[i].step_name,
                start_sec: getSecondsFromHHMMSS(steps[i].start_second),
                duration: getSecondsFromHHMMSS(steps[i].duration),
                description: steps[i].description
            }
            const last_step_end = steps_duration[steps_duration.length - 1].start_sec + steps_duration[steps_duration.length - 1].duration;
            if (new_step.start_sec !== last_step_end) {
                steps_duration.push({
                    name: "wait",
                    start_sec: last_step_end,
                    duration: new_step.start_sec - last_step_end,
                })
            }
            steps_duration.push(new_step)

        }
    }

    const [currentStep, setCurrentStep] = useState({step: steps_duration[0], index: 0});

    const [isTimeOut, setIsTimeOut] = useState(false);

    useEffect(() => {
        if (isTimeOut) {
            if (currentStep.index + 1 === steps_duration.length) {
                setIsFinished(true);
                stopTimers();
            } else {
                setCurrentStep(prev => ({step: steps_duration[prev.index + 1], index: prev.index + 1}));
                setCounter(currentStep.step.duration);
                setIsTimeOut(false);
                console.log(currentStep);
            }
        }
    }, [isTimeOut]);

    const fillImpression = () => {
        dispatch(showFormAction(recipe));
    }

    const [counterSecond, setCounterSecond] = React.useState(0);
    const [counter, setCounter] = React.useState(currentStep.step === undefined ? {} : currentStep.step.duration);
    const [status, setStatus] = React.useState(true);

    React.useEffect(() => {
        let secondCounterId;
        let counterId;
        if (status) {
            secondCounterId = setTimeout(
                () => setCounterSecond(counterSecond + 1),
                1000
            );
            counterId = setTimeout(() => {
                counter - 1 <= 0 ? setIsTimeOut(true) : setCounter(counter - 1)
            }, 1000);
        }

        return () => {
            clearTimeout(counterId);
            clearTimeout(secondCounterId);
        };
    }, [counterSecond, counter, status]);

    const stopTimers = () => {
        setStatus(prevState => !prevState);
    };

    return (recipeReducer.isBrewed &&
        <div className="brew-page">
            <img className="recipe-icon" src={"../photos/" + recipe.brewer + ".png"}/>
            <h1>{recipe.recipe_name}</h1>
            {steps_duration.length !== 0 ? <div className="timer">
                {isFinished ? <div><h1>Enjoy</h1>
                    <button className="main-button" onClick={() => fillImpression()}>fill</button>
                </div> : !isTimeOut &&
                    <div>
                        <h2>{currentStep.step.name}</h2>
                        <h1> {Math.floor(counter / 60) + ":" + (counter % 60 < 10 ? "0" + counter % 60 : counter % 60)}</h1>
                        <p>{currentStep.step.description}</p>
                    </div>
                }
            </div> : <h1>Looks like there are no steps:(</h1>}
            {!isFinished &&
            <button className="secondary-button play-button" onClick={stopTimers}>
                <img className="recipe-icon" src={"../photos/" + (status ? "pause.png" : "play.png")}/>
                <p>{(status ? "pause" : "play")}</p></button>}
        </div>);
}