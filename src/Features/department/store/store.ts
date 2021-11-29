import {configureStore} from "@reduxjs/toolkit";

import departmentReducer from './reducer';


export default configureStore({
    reducer: {
            department:departmentReducer
        }
});
