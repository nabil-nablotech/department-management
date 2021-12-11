export default interface Department {
    id:string;
    name:string;
    description: string;
    parentDepartmentId ?: string;
}