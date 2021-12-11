import Department from "../../../model/department";
 
export  enum actionType {
    addDepartment = "ADD_DEPARTMENT",
    deleteDepartment = "DELETE_DEPARTMENT",
    updateDepartment = "UPDATE_DEPARTMENT"
};

interface actionAddDepartment{
    type:actionType.addDepartment;
    payload: Department | Department[];
}

interface actionDeleteDepartment{
    type:actionType.deleteDepartment;
    payload: Department[];
}

interface actionUpdateDepartment{
    type:actionType.updateDepartment;
    payload: Department;
}

export type Action = actionAddDepartment | actionUpdateDepartment | actionDeleteDepartment;

export function addDepartment(payload:Department | Department[]){
    return {type:actionType.addDepartment,payload:payload}
}

export function removeDepartment(payload:Department[]){
    return {type:actionType.deleteDepartment,payload:payload}
}

export function editDepartment(payload:Department){
    return {type:actionType.updateDepartment,payload:payload}
}