import Department from "../../../model/department";
import { Dispatch } from "redux";
import { actionType, Action, addDepartment,removeDepartment,editDepartment } from "./department.action";
import DepartmentApi  from "../api/api";

const initialState:{departments:Department[]} = {departments:[]};

export default function departmentReducer (state = initialState,action: Action){

    switch(action.type){
        case actionType.addDepartment:
            if(Array.isArray(action.payload)){
                return {...state,departments:action.payload};   
            }
            return {...state,departments:state.departments.concat(action.payload)};

        case actionType.updateDepartment:
            return {...state,departments:state.departments.map((department)=>{ if(department.id===action.payload.id){
                                                                    return action.payload;
                                                                }
                                                                return department;
                                                            })};


        case actionType.deleteDepartment:
            return {...state,departments:state.departments.filter((department)=>{ return !action.payload.find(dept=>dept.id===department.id)})};

        default:
            return state;
    }  
}

export async function getDepartment(dispatch:Dispatch<any>){
    try{
        const response = await DepartmentApi.getDepartment();
        dispatch(addDepartment(response.data.items));
    }
    catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}

export function createDepartment(info:{name:string;description:string;parentDepartmentId?:string}){
    
    return async (dispatch:Dispatch<any>) =>{
        try{
            const response = await DepartmentApi.createDepartment(info);
            dispatch(addDepartment(response.data));
        }
        catch(err){
            console.log(err);
            return Promise.reject(err);
        }
    }
}

export function updateDepartment(department:Department){
    
    return async (dispatch:Dispatch<any>) =>{
        try{
            await DepartmentApi.updateDepartment(department);
            dispatch(editDepartment(department));
        }
        catch(err){
            console.log(err);
            return Promise.reject(err);
        }
    }
}

export function deleteDepartment(department:Department,descendents:Department[]){
    
    return async (dispatch:Dispatch<any>) =>{
        try{
            await DepartmentApi.deleteDepartment(department.id);
            dispatch(removeDepartment([department,...descendents]));
        }
        catch(err){
            console.log(err);
            return Promise.reject(err);
        }
    }
}

