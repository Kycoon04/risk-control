"use client";
import { useState, useEffect } from "react";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/filter";
import { Success, Error } from "../../notifications/alerts";
import {Role} from "@/types";
import {fetchRoleAll, deleteRole} from "../../actions/actions_roles/actions";
import RoleCard from "../maintenance_cards/role_card"
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/role_storage';
const RolesMaintenance: React.FC = () => {
    const param: Role = {
        id: "",
        name: "",
        active: "",
    };
    const [roles,setRoles] =useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<Role[]>([]);
    const [filters, setFilters] = useState<Partial<Role>>(param);
    const setRole = useAuthStore(state => state.setRole);

    const clearFilters = () => {
        setFilters(param);
        setRoles(unfiltered);
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchRoleAll();
            setRoles(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filteredRoles = unfiltered.filter(item => {
                return Object.keys(filters).every(key => {
                    const filterValue = filters[key as keyof Role];
                    const itemValue = item[key as keyof Role];

                    if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                        const stringValue = String(filterValue).toLowerCase();
                        const itemStringValue = String(itemValue).toLowerCase();
                        return itemStringValue.includes(stringValue);
                    } else {
                        return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
                    }
                });
            });
            setRoles( filteredRoles);
        };
        applyFilters();
    }, [filters, unfiltered]);

    const handleDeleteRole = async (roleId: string) => {
        const deletionResult = await deleteRole(parseInt(roleId, 10));

        if (deletionResult) {
            Success('Role eliminado correctamente')
            const fetchedSections = await fetchRoleAll();
            setRoles(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
        } else {
            Error('Error al intentar eliminar la unidad');
        }
    };
    const handleModifyRole = async (role:Role) => {
        console.log(role.id+" "+role.name+" "+role.active)
        setRole(role);
    };

    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                Mantenimiento de roles
            </h2>
            <Filter<Role> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
                {isLoading ? (
                    <Spinner />) : (
                    roles.map((role) => (
                        <RoleCard key={role.id} prompt_one="Id:" prompt_two="Nombre:" prompt_three="Estado:" handleDeleteRole={handleDeleteRole} handleModifyRole={handleModifyRole} {...role} />
             )))}
        </div>
    );
};

export default RolesMaintenance;