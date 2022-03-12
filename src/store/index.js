import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "./userReduser";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {coffeeReducer} from "./coffeeReduser";
import {recipeWidgetReducer} from "./recipeWidgetReducer";

const rootReducer = combineReducers({userReducer, coffeeReducer, recipeWidgetReducer: recipeWidgetReducer});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));