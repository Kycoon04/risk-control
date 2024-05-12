"use client";
import Link from 'next/link';
import { FaRegPlusSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/Filters/filter";
import {Role} from "@/types";
import {fetchRoleAll, deleteRole} from "../../actions/actions_roles/actions";
import RoleCard from "../maintenance_cards/role_card"
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/role_storage';
import {param,filtered,stateDeleted,updateData} from '../maintenance_pages/methods_pages/roles_methods'
const RolesMaintenance: React.FC = () => {
    const [roles,setRoles] =useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<Role[]>([]);
    const [filters, setFilters] = useState<Partial<Role>>(param);
    const setRole = useAuthStore(state => state.setRole);
    const clearFilters = () => { setFilters(param); setRoles(unfiltered); };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchRoleAll();
            updateData(setRoles,setUnfiltered,fetchedSections);
            setIsLoading(false);
        }; fetchData();
    }, []);
    useEffect(() => {
        const applyFilters = () => {
            const filteredRoles = filtered(unfiltered,filters);
            setRoles( filteredRoles);
        }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteRole = async (roleId: string) => {
        const deletionResult = await deleteRole(parseInt(roleId, 10));
        stateDeleted(deletionResult,setRoles,setUnfiltered);
    };
    const handleModifyRole = async (role:Role) => { setRole(role); };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'> Mantenimiento de roles </h2>
            <Filter<Role> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
                <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                    <div className="w-full md:w-auto flex justify-start items-center">
                        <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                            <Link href={'/home_page/maintenance/mainte_roles/roles_register'}>
                                <FaRegPlusSquare className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                            </Link>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <Spinner />) : (
                    roles.map((role) => (
                        <RoleCard key={role.id} prompt_one="Id:" prompt_two="Nombre:" prompt_three="Estado:" handleDeleteRole={handleDeleteRole} handleModifyRole={handleModifyRole} {...role} />
             )))}
        </div>
    );
};
export default RolesMaintenance;