import { Form, Input, Button, Drawer, TreeSelect, Popconfirm, notification, Tree } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Department from "../../../model/department";
import { createDepartment, deleteDepartment, updateDepartment } from "../reducer/department.reducer";
import { useEffect, useState } from "react";

export function DepartmentForm(props: { formType: "new" | "update"; visibility: boolean; visibilityToggler: () => void; selectedDepartment?: Department }) {
    const departments = useSelector((state: RootState) => state.departments);
    const dispatch = useDispatch();
    const treeData = departments.map((department: Department) => { return { id: department.id, pId: department.parentDepartmentId, title: department.name, value: department.id } });
    const [form] = Form.useForm();
    const [popVisible, setPopVisible] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    
    const reformattedNodes: { id:string; key: string; title: string; parent_id: string | undefined }[] = departments.map((element: Department) => {
        return { id:element.id, key: element.id, title: element.name, parent_id: element.parentDepartmentId }
    });

    function makeTree(nodes: any, parentId: string) {
        return nodes
            .filter((node: any) => node.parent_id === parentId)
            .reduce(
                (tree: any, node: any) => [
                    ...tree,
                    {
                        ...node,
                        children: makeTree(nodes, node.id),
                    },
                ],
                [],
            )
    }
   


    const getDescendents: (ancestorId: string) => Department[] = (ancestorId) => {

        let descendents = departments.filter((item) => {

            let parent: Department | undefined = departments.find((department: Department) => { return department.id === item.parentDepartmentId });

            while (parent != null) {
                if (parent.id === ancestorId) {
                    return true;
                }
                parent = departments.find((department: Department) => { return department.id === parent!.parentDepartmentId })
            }
            return false;
        });

        return descendents;
    }

    const managedDepartments: Department[] | undefined = (props.formType === 'update') ? getDescendents(props.selectedDepartment!.id) : undefined;
    const managedDepartmentsTreeData = (managedDepartments) ? managedDepartments.map((department: Department) => { return { id: department.id, pId: department.parentDepartmentId, title: department.name, value: department.id, selectable: false } }) : [];

    //All event handlers goes below
    const onFinish: (value: { id?: string; name: string; description: string; parentDepartmentId?: string }) => void = (value) => {
        if (props.formType === "new") {
            setSubmitLoading(true);
            const asyncDispatcher = async () => await dispatch(createDepartment(value));
            asyncDispatcher().then(() => {
                form.resetFields();
                notification.success({
                    message: `Department created successfully`,
                    description: 'Department ' + value.name + "has been registered successfully.",
                    placement: "bottomRight"
                });
                setSubmitLoading(false);
            }).catch((err) => {
                notification.error({
                    message: `Failed to register department`,
                    description: err + '.',
                    placement: "bottomRight"
                });
                setSubmitLoading(false);
            });

        } else if (props.formType === "update") {
            setSubmitLoading(true);
            const asyncDispatcher = async () => await dispatch(updateDepartment(value as Department));
            asyncDispatcher().then(() => {
                notification.success({
                    message: `Department info updated successfully`,
                    description: 'Department ' + value.name + " info has been updated successfully.",
                    placement: "bottomRight"
                });
                setSubmitLoading(false);
            }).catch((err) => {
                notification.error({
                    message: `Failed to update department info`,
                    description: err + '.',
                    placement: "bottomRight"
                });
                setSubmitLoading(false);
            });
        }
    }

    const showPop = () => {
        setPopVisible(true);
    }

    const onPopCancel = () => {
        setPopVisible(false);
    }

    const onConfirmDelete: (department: Department) => void = (department) => {
        setDeleteLoading(true);
        const asyncDispatcher = async () => await dispatch(deleteDepartment(department, getDescendents(department.id)));
        asyncDispatcher().then(() => {
            notification.success({
                message: `Department removed successfully`,
                description: "Department has been removed successfully.",
                placement: "bottomRight"
            });
            setPopVisible(false);
            setDeleteLoading(false);
            form.resetFields();
            props.visibilityToggler();
        }).catch((err) => {
            notification.error({
                message: `Failed to delete department`,
                description: err + '.',
                placement: "bottomRight"
            });
            setPopVisible(false);
            setDeleteLoading(false);
        });


    }

    //end of event handlers

    useEffect(() => {
        if (props.formType === 'update' && props.selectedDepartment != null) {
            form.setFieldsValue({
                id: props.selectedDepartment.id,
                name: props.selectedDepartment.name,
                description: props.selectedDepartment.description,
                parentDepartmentId: props.selectedDepartment.parentDepartmentId
            });
        }
    }, []);

    return (
        <Drawer
            title={(props.formType === 'new') ? "Register new department" : "Department details"}
            width={720}
            onClose={() => { props.visibilityToggler(); form.resetFields(); }}
            visible={props.visibility}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <Form onFinish={onFinish} form={form} autoComplete="off" labelAlign="left" labelCol={{ span: 6 }} wrapperCol={{ offset: 1 }}>
                {props.formType === 'update' &&

                    <Form.Item hidden
                        name="id"
                        rules={[
                            { required: true, message: "Id is required." },
                            { whitespace: true, message: "Department name can not be empty." },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                }

                <Form.Item label="Department name"
                    name="name"
                    rules={[
                        { required: true, message: "Department name is required." },
                        { whitespace: true, message: "Department name can not be empty." },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Please enter department name" />
                </Form.Item>

                <Form.Item label="Department description"
                    name="description"
                    rules={[
                        { required: true, message: "Department description is required." },
                        { whitespace: true, message: "Department description can not be empty." },
                    ]}
                    hasFeedback
                >
                    <Input.TextArea placeholder="Please enter department description" rows={4} />
                </Form.Item>

                <Form.Item name="parentDepartmentId" label="Managing department">
                    <TreeSelect
                        treeData={treeData}
                        treeDataSimpleMode
                        placeholder="Select managing department"
                    //treeDefaultExpandedKeys = {(props.mode==='edit')?[departmentDetails.parentDepartmentId]:undefined}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10 }}>
                    {props.formType === 'new' &&
                        <Button type="primary" htmlType="submit" loading={submitLoading}>
                            Submit
                        </Button>
                    }

                    {props.formType === 'update' &&
                        <>
                            <Button className="mr-10" type="primary" htmlType="submit" loading={submitLoading}>
                                Update
                            </Button>

                            <Popconfirm
                                title={"This action will also remove the departments under " + props.selectedDepartment!.name}
                                visible={popVisible}
                                onConfirm={() => onConfirmDelete(props.selectedDepartment!)}
                                okButtonProps={{ loading: deleteLoading }}
                                onCancel={onPopCancel}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                <Button type="primary" onClick={showPop} danger>Delete</Button>
                            </Popconfirm>
                        </>
                    }


                </Form.Item>
            </Form>

            {props.formType === "update" &&
                <>
                    <b>Departments under your management: </b>
                    {(managedDepartmentsTreeData.length == 0) ? " None" :
                        <Tree
                            className="w-1/2"
                            treeData={makeTree(reformattedNodes,props.selectedDepartment!.id)}

                        />
                    }

                </>
            }

        </Drawer>

    );
}