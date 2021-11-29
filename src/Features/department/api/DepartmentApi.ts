export default class DepartmentApi{

     static async createDepartment(department:{name:string,description:string,parentDepartmentId?:string}){
        const createDepartmentEndPoint="https://localhost:5001/api/departments/create-department";
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(department)
        };
    
        try{
            const response = await fetch(createDepartmentEndPoint,requestOptions);
            return response;
        }
        
        catch{
            throw new Error();
        }    
    }


    static async updateDepartment(department:{id:string, name:string,description:string,parentDepartmentId?:string}){
        const updateDepartmentEndPoint="https://localhost:5001/api/departments/update-department";
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(department)
        };
    
        try{
            const response = await fetch(updateDepartmentEndPoint,requestOptions);
            return response;
        }
        
        catch{
            throw new Error();
        }    
    }

    static async deleteDepartment(departmentId:string){
        const deleteDepartmentEndPoint="https://localhost:5001/api/departments/delete-department/"+departmentId;
        
        const requestOptions = {
            method: 'DELETE'
        };
    
        try{
            const response = await fetch(deleteDepartmentEndPoint,requestOptions);
            return response;
        }
        
        catch{
            throw new Error();
        }    
    }

    static async getDepartments(){
        const getDepartmentsEndPoint="https://localhost:5001/api/departments/get-departments";
        
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(department) later on i will add the filter options
        };
    
        try{
            const response = await fetch(getDepartmentsEndPoint,requestOptions);
            return response;
        }
        
        catch{
            throw new Error();
        }    
    }
}
