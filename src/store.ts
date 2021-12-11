import { createStore,applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import departmentReducer from "./features/department/reducer/department.reducer";

const store = createStore(departmentReducer, applyMiddleware(thunkMiddleware));
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch