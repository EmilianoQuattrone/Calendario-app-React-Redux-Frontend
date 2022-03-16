import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarioReducer } from "./calendarioReducer";
import { uiReducer } from "./uiReducer";

export const rootReducers = combineReducers({

    ui: uiReducer,
    calendario: calendarioReducer,
    auth: authReducer
});