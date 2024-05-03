"use client";
import { RoleXUser, User } from "@/types";
import UserCard from "../maintenance_cards/card_maintenance";
import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../actions/actions_users/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/filter";
import { Success, Error } from "../../notifications/alerts";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/user_storage';
import {fetchUserRole, fetchRole} from '@/app/components/actions/actions_roles/actions'
const UsersMaintenance: React.FC = () => {
    const param: User = {
        id: "",
        department: "",
        name: "",
        second_name: "",
        surname: "",
        second_surname: "",
        email: "",
        identification: "",
        nickname: "",
        phone_number: ""
    };
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<User[]>([]);
    const [filters, setFilters] = useState<Partial<User>>(param);
    const setUser = useAuthStore(state => state.setUser);
    const setRol = useAuthStore(state => state.setRol);

    const clearFilters = () => {
        setFilters(param);
        setUsers(unfiltered);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchUsers(param);
            setUsers(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filteredLoggers = unfiltered.filter(item => {
                return Object.keys(filters).every(key => {
                    const filterValue = filters[key as keyof User];
                    const itemValue = item[key as keyof User];

                    if (typeof filterValue === 'number' || typeof itemValue === 'number') {
                        const stringValue = String(filterValue).toLowerCase();
                        const itemStringValue = String(itemValue).toLowerCase();
                        return itemStringValue.includes(stringValue);
                    } else {
                        return itemValue.toLowerCase().includes((filterValue || "").toLowerCase());
                    }
                });
            });
            setUsers(filteredLoggers);
        };
        applyFilters();
    }, [filters, unfiltered]);

    const handleDeleteUser = async (userId: string) => {
        console.log(userId)
        const deletionResult = await deleteUser(parseInt(userId, 10));

        if (deletionResult) {
            Success('Usuario eliminado correctamente')
            const fetchedSections = await fetchUsers(param);
            setUsers(fetchedSections.props.data);
            setUnfiltered(fetchedSections.props.data);
        } else {
            Error('Error al intentar eliminar el usuario');
        }
    };
    const fetchUserRol = async (props: RoleXUser) => {
        const fetchedRoleXUser = await fetchUserRole(props);
        const fetchedRole = await fetchRole(fetchedRoleXUser.props.data[0].role);
        return fetchedRole;
    };
    const handleModifyUser = async (user: User) => {
        setUser(user);
        const role = await fetchUserRol({
            id: "",
            user: user.id,
            role: ""
          });
          setRol(role);
    };
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-5'>
                    Mantenimiento de Usuarios
                </h2>
                <Filter<User> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
                {isLoading ? (
                    <Spinner />) : (
                    users.map((user) => (
                        <UserCard key={user.id} prompt_one="Nombre:" prompt_two="Cédula:" prompt_three="Nickname:"  handleDeleteUser={handleDeleteUser} handleModifyUser={handleModifyUser} {...user} />
                    )))}
            </div>
        </>
    );
};
export default UsersMaintenance;