"use client";
import { ParamDepartment,departXForms,departmentSelected,Form } from "@/types";
import {fetchDepartment} from "../../../actions/actions_departments/actions";
import { fetchDepartXIdForms } from '@/app/components/actions/actions_deparxforms/actions';
import { Success, Error } from "../../../notifications/alerts";
import { Dispatch, SetStateAction } from "react";
export const param: ParamDepartment = { id: "", name: "", description: "", unit: "", };
export const loadData = async (setDepartments:Dispatch<SetStateAction<ParamDepartment[]>>,setUnfiltered:Dispatch<SetStateAction<ParamDepartment[]>>,setDepartXForms:Dispatch<SetStateAction<departXForms[]>>,form:Form,setIsLoading:Dispatch<SetStateAction<boolean>>) =>{
    setIsLoading(true);
    updateData(setDepartments,setUnfiltered,setDepartXForms,form);
    setIsLoading(false);
}
export const importList = (departXForm: departXForms[], departments: ParamDepartment[]): departmentSelected[] => {
        const list: departmentSelected[] = [];
            for (let i = 0; i < departments.length; i++) {
                const isDepartmentSelected = departXForm.some(depForm => depForm.department === departments[i].id);
                list.push({ department: departments[i], state: isDepartmentSelected ? "Agregado" : "No Agregado", });
            }
        return list;
}
export const filtered  = (unfiltered:ParamDepartment[],filters:Partial<ParamDepartment>) => {
    const filteredDepartments = unfiltered.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key as keyof ParamDepartment];
            const itemValue = item[key as keyof ParamDepartment];
            if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                const stringValue = String(filterValue).toLowerCase();
                const itemStringValue = String(itemValue).toLowerCase();
                return itemStringValue.includes(stringValue);
            } else {
                return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
            }
        });
    });
    return filteredDepartments;
}
export const stateDeleted = async (deletionResult:boolean,setDepartments:Dispatch<SetStateAction<ParamDepartment[]>>,setUnfiltered:Dispatch<SetStateAction<ParamDepartment[]>>,setDepartXForms:Dispatch<SetStateAction<departXForms[]>>,form:Form) => {
    if (deletionResult) {
        Success('Departamento eliminado correctamente')
        updateData(setDepartments,setUnfiltered,setDepartXForms,form);
    } else {
        Error('Error al intentar eliminar el departamento');
    }
}
export const stateAdded = async (AddedResult:boolean,setDepartments:Dispatch<SetStateAction<ParamDepartment[]>>,setUnfiltered:Dispatch<SetStateAction<ParamDepartment[]>>,setDepartXForms:Dispatch<SetStateAction<departXForms[]>>,form:Form) => {
    if (AddedResult) {
        Success('Departamento agregado correctamente')
        updateData(setDepartments,setUnfiltered,setDepartXForms,form);
    } else {
        Error('Error al intentar agregar el departamento');
    }
}
export const updateData = async (setDepartments:Dispatch<SetStateAction<ParamDepartment[]>>,setUnfiltered:Dispatch<SetStateAction<ParamDepartment[]>>,setDepartXForms:Dispatch<SetStateAction<departXForms[]>>,form:Form) => {
    const fetchedSections = await fetchDepartment(param);
    setDepartments(fetchedSections.props.data);
    setUnfiltered(fetchedSections.props.data);
    const fetchedDepartXForm = await fetchDepartXIdForms(form.id);
    setDepartXForms(fetchedDepartXForm);
}