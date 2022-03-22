import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "./userReduser";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {coffeeReducer} from "./coffeeReduser";
import {recipeWidgetReducer} from "./recipeWidgetReducer";
import {addRecipeFormReducer} from "./addRecipeFormReducer";

const rootReducer = combineReducers({userReducer, coffeeReducer, recipeWidgetReducer, addRecipeFormReducer});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
