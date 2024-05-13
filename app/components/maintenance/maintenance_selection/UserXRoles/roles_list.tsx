"use client";
import Link from 'next/link';
import { Role,RoleXUser,roleSelected } from "@/types";
import { useState, useEffect } from "react";
import Spinner from "../../../notifications/Spinner";
import Filter from "../../../utils_comp/Filters/filter";
import RoleCard from "../../../maintenance/maintenance_selection/UserXRoles/rol_card";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/user_storage';
import {deleteRoleXUser, postRoleXUser} from "../../../actions/actions_rolesxuser/actions";
import { IoReturnDownBack } from "react-icons/io5";
import {param,importList,filtered,stateAdded,stateDeleted,updateData,loadData} from '../UserXRoles/selection_methods'
const RolesList: React.FC = () => {
    const [roles,setRoles] =useState<Role[]>([]);
    const [rolesState,setRolesState] =useState<roleSelected[]>([]);
    const [roleXUser,setRoleXUser] =useState<RoleXUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<Role[]>([]);
    const [filters, setFilters] = useState<Partial<Role>>(param);
    const user = useAuthStore(state => state.user);
    const clearFilters = () => { setFilters(param); setRoles(unfiltered); };
    useEffect(() => {
        const fetchData = async () => { loadData(setRoles,setUnfiltered,setRoleXUser,user, setIsLoading); }; fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setRolesState(importList(roleXUser, roles));
        }; if (roles.length > 0 && roleXUser.length > 0) {fetchData();}
    }, [roles, roleXUser]);
    useEffect(() => {
        const applyFilters = () => { setRoles( filtered(unfiltered,filters)); }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteRole = async (roleId: string) => {
        const deletionResult = await deleteRoleXUser(parseInt(user.id, 10),parseInt(roleId, 10));
        stateDeleted(deletionResult,setRoles,setUnfiltered,setRoleXUser,user);
    };
    const handleAddRole = async (roleId: string) => {
        const addedResult = await postRoleXUser(parseInt(user.id, 10),parseInt(roleId, 10));
        stateAdded(addedResult?.ok||false,setRoles,setUnfiltered,setRoleXUser,user);
    };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center justify-center'>
            <Filter<Role> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
                <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                    <div className="w-full md:w-auto flex justify-start items-center">
                        <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                            <Link href={'/home_page/maintenance/mainte_users/users_form'}>
                                <IoReturnDownBack className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                            </Link>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <Spinner />) : (
                    rolesState.map((roleState) => (
                        <RoleCard key={roleState.role.id} prompt_one="id:" prompt_two="Rol:" prompt_three="Estado:" prompt_fourth="Condición:" handleDeleteRole={handleDeleteRole} handleAddRole={handleAddRole} {...roleState} />
             )))}
        </div>
    );
};
export default RolesList;