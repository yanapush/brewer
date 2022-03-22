import {addRecipeAction} from "./userReduser";

const SHOW = "SHOW_FORM";
const SHOW_ADD_STEP = "SHOW_STEP_FORM";
const HIDE_ADD_STEP = "HIDE_STEP_FORM";
const SUBMIT_STEP = "SUBMIT_STEP";
const HIDE = "HIDE_FORM";
const SUBMIT = "SUBMIT_FORM"
const UPDATE = "UPDATE_FORM"

const defaultState = {
    isShown: false,
    formData: {
        // characteristic : null,
        steps : [],
        author: {},
        grind_size : "23"
    },
    stepsFormData: {
        isShown: false,
        steps: []
    }
}

export const addRecipeFormReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SHOW : {
            return {formData: action.payload === undefined ? state.formData : action.payload, isShown: true};
        }
        case HIDE :
            return {formData: action.payload === undefined ? state.formData : action.payload, isShown: false};

        case SUBMIT : {
            console.log(state.isShown);
            addRecipeAction(action.payload);
            return {...state, isShown: false};}

        case UPDATE : {
            return {...state, formData: {...state.formData, [action.payload.name] : action.payload.value }};
        }

        case SHOW_ADD_STEP :
            return {...state, stepsFormData: {...state.stepsFormData, isShown: true}}

        case HIDE_ADD_STEP :
            return {...state, stepsFormData: {...state.stepsFormData, isShown: false}}

        case SUBMIT_STEP :
            return {...state,
                stepsFormData: {
                    ...state.stepsFormData,
                    steps: [...state.stepsFormData.steps, action.payload],
                    isShown: false
                }
            };

        default:
            return state;
    }
}

export const showFormAction = (payload) => ({type: SHOW, payload: payload});
export const hideFormAction = (payload) => ({type: HIDE, payload: payload});
export const submitFormAction = (payload) => ({type: SUBMIT, payload: payload});
export const updateFormAction = (payload) => ({type: UPDATE, payload: payload});

export const showStepsFormAction = (payload) => ({type: SHOW_ADD_STEP, payload: payload});
export const hideStepsFormAction = (payload) => ({type: HIDE_ADD_STEP, payload: payload});
export const submitStepsFormAction = (payload) => ({type: SUBMIT_STEP, payload: payload});
