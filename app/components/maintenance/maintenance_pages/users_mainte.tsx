"use client";
import { User } from "@/types";
import UserCard from "../maintenance_cards/card_maintenance";
import PaginationBar from "../paginationBar";
import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../actions/actions_users/actions";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/Filters/filter";
import { useAuthStore } from '@/app/components/maintenance/maintenance_storages/user_storage';
import { param, filtered, stateDeleted, updateData } from "../maintenance_pages/methods_pages/users_methods"
const UsersMaintenance: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<User[]>([]);
    const [filters, setFilters] = useState<Partial<User>>(param);
    const setUser = useAuthStore(state => state.setUser);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const clearFilters = () => { setFilters(param); setUsers(unfiltered); };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchUsers(param);
            updateData(setUsers, setUnfiltered, fetchedSections);
            setIsLoading(false);
        }; fetchData();
    }, []);
    useEffect(() => {
        const applyFilters = () => {
            const filteredLoggers = filtered(unfiltered, filters);
            setUsers(filteredLoggers);
        }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteUser = async (userId: string) => {
        const deletionResult = await deleteUser(parseInt(userId, 10));
        stateDeleted(deletionResult, setUsers, setUnfiltered);
    };
    const handleModifyUser = async (user: User) => {
        setUser(user);

    };
    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-2xl items-center justify-center'>
                <h2 className='text-2xl sm:text-center text-white text-center m-5'> Mantenimiento de Usuarios</h2>
                <Filter<User> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
                {isLoading ? (
                    <Spinner />) : (
                    currentItems.map((user) => (
                        <UserCard key={user.id} prompt_one="Nombre:" prompt_two="Cédula:" prompt_three="Nickname:" handleDeleteUser={handleDeleteUser} handleModifyUser={handleModifyUser} {...user} />
                    )))}
                <div className="flex justify-center">
                    <PaginationBar
                        maintenance={users}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        changePage={changePage}
                    />
                </div>
            </div>
        </>
    );
};
export default UsersMaintenance;