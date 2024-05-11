"use client";
import { ParamDepartment,departXForms,departmentSelected } from "@/types";
import {fetchDepartment} from "../../../actions/actions_departments/actions";
import { fetchDepartXIdForms } from '@/app/components/actions/actions_deparxforms/actions';
import { Success, Error } from "../../../notifications/alerts";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/form_storage';
import {deleteDepartXIdForms, postDepartXForm} from "../../../actions/actions_deparxforms/actions";
import { list } from "postcss";
export const param: ParamDepartment = {
    id: "",
    name: "",
    description: "",
    unit: "",
};

export const importList = (departXForm: departXForms[], departments: ParamDepartment[]): departmentSelected[] => {
        const list: departmentSelected[] = [];
            for (let i = 0; i < departments.length; i++) {
                const isDepartmentSelected = departXForm.some(depForm => depForm.department === departments[i].id);
                list.push({
                    department: departments[i],
                    state: isDepartmentSelected ? "Agregado" : "No Agregado",
                });
            }
        return list;
}
