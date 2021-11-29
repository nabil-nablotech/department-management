import { createSlice } from "@reduxjs/toolkit";
import DepartmentApi from "../api/DepartmentApi";


export const departmentSlice = createSlice({
    name:'department',
    initialState: {departments:[]},
    reducers: {
        add: (state,action)=>{
            if(action.payload.items !== undefined){
                state.departments = action.payload.items;
            }
        }        
    }
});

export  function createDepartment(department:{name:string,description:string,parentDepartmentId?:string},responseHandler:any){
    
    return async (dispatch:any,getState:any)=>{
        try{
            const response = await DepartmentApi.createDepartment(department);
            const data = await response.json();
            //dispatch(add(data));// this was when create dept adds single dept to the store
            responseHandler(true);            
        }
        catch{
            responseHandler(false);
        }
    }
}

export  function updateDepartment(department:{id:string,name:string,description:string,parentDepartmentId?:string},responseHandler:any){
    
    return async (dispatch:any,getState:any)=>{
        try{
            const response = await DepartmentApi.updateDepartment(department);
            const data = await response.json();
            //dispatch(add(data));// this was when create dept adds single dept to the store
            responseHandler(true);            
        }
        catch{
            responseHandler(false);
        }
    }
}

export  function deleteDepartment(departmentId:string,responseHandler:any){
    
    return async (dispatch:any,getState:any)=>{
        try{
            const response = await DepartmentApi.deleteDepartment(departmentId);
            const responsee = await DepartmentApi.getDepartments();
            const data = await responsee.json();
            dispatch(add(data));
            responseHandler(true);            
        }
        catch{
            responseHandler(false);
        }
    }
}

export  function getDepartments(){
    return async (dispatch:any,getState:any)=>{
        try{
            const response = await DepartmentApi.getDepartments();
            const data = await response.json();
            dispatch(add(data));
        }
        catch(err){
            console.log(err);
        }
    }
}
export const { add } = departmentSlice.actions

export default departmentSlice.reducer