const SHOW = "SHOW";
const HIDE = "HIDE";

const defaultState = {
    isShown : false,
    recipe : {}
}
export const recipeWidgetReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SHOW" : {
            return { recipe : action.payload === undefined ? state.recipe : action.payload, isShown: true};
        }
        case "HIDE" : {
            return { recipe : action.payload === undefined ? state.recipe : action.payload, isShown: false};
        }
        default: return state;
    }
}

export const showAction = (payload) => ({type : SHOW, payload: payload});
export const hideAction = (payload) => ({type : HIDE, payload: payload});
