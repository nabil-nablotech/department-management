import { enviroment } from "../../../enviroment/enviroment.dev";
import Department from "../../../model/department";
import axios from "axios";

const endPoints = {
 createDepartment: enviroment+"/api/departments/create-department",
 updateDepartment: enviroment+"/api/departments/update-department",
 deleteDepartment: enviroment+"/api/departments/delete-department/",
 getDepartment: enviroment+"/api/departments/get-department/",
 getDepartments: enviroment+"/api/departments/get-departments/",
 getDepartmentsUnderMangement: enviroment+"/api/departments/get-departments-under-management",
 getManagingDepartments: enviroment+"/api/departments/get-managing-departments"
};

export default class DepartmentApi{

    static createDepartment:(department:{name:string;description:string;parentDepartmentId?:string})=>any = (department)=>{
        return axios.post(endPoints.createDepartment,department);
    }

    static getDepartment:()=>any = ()=>{
        return axios.get(endPoints.getDepartments);
    }

    static deleteDepartment:(id:string)=>any = (id)=>{
        return axios.delete(endPoints.deleteDepartment + id);
    }

    static updateDepartment:(department:Department)=>any = (department)=>{
        return axios.post(endPoints.updateDepartment,department);
    }
}