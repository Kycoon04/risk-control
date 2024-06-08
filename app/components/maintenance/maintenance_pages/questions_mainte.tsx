"use client";
import Link from 'next/link';
import { FaRegPlusSquare } from "react-icons/fa";
import PaginationBar from "../paginationBar";
import { useState, useEffect } from "react";
import Spinner from "../../notifications/Spinner";
import Filter from "../../utils_comp/Filters/filter";
import { ParamQuestions } from "@/types";
import { fetchQuestion, deleteQuestion } from "../../actions/actions_questions/actions";
import QuestionCard from "../maintenance_cards/question_card";
import { useAuthStore } from "../maintenance_storages/question_storage";
import { param,params, filtered, updateData, stateDeleted } from "../maintenance_pages/methods_pages/questions_methods"
const QuestionsMaintenance: React.FC = () => {
    const [Count, setCount] = useState(0);
    const [questions, setQuestions] = useState<ParamQuestions[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfiltered, setUnfiltered] = useState<ParamQuestions[]>([]);
    const [filters, setFilters] = useState<Partial<ParamQuestions>>(param);
    const setQuestion = useAuthStore(state => state.setQuestion);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

    const clearFilters = () => { setFilters(param); setQuestions(unfiltered); };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedSections = await fetchQuestion(params);
            updateData(setQuestions, setUnfiltered, fetchedSections,setCount);
            setIsLoading(false);
        }; fetchData();
    }, []);
    useEffect(() => {
        const applyFilters = () => {
            const filteredQuestions = filtered(unfiltered, filters);
            setQuestions(filteredQuestions);
        }; applyFilters();
    }, [filters, unfiltered]);
    const handleDeleteQuestion = async (roleId: string) => {
        const deletionResult = await deleteQuestion(parseInt(roleId, 10));
        stateDeleted(deletionResult, setQuestions, setUnfiltered,setCount);
    };
    const changePage = async (pageNumber: number) => {
        params.page = pageNumber;
        const fetchedSections = await fetchQuestion(params);
        updateData(setQuestions, setUnfiltered, fetchedSections,setCount);
        console.log(questions)
        setCurrentPage(pageNumber);
    };
    const handleModifyQuestion = async (question: ParamQuestions) => { setQuestion(question); };
    return (
        <div className='bg-gray-200 w-90vw md:w-90 sm:w-[90%] m-3 p-3 flex flex-col rounded-3xl items-center justify-center'>
            <h2 className='text-2xl sm:text-center text-white text-center m-5'> Mantenimiento de Preguntas </h2>
            <Filter<ParamQuestions> filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            <div className="bg-gray-200 w-full flex flex-wrap gap-5 rounded-md px-5 place-items-end mb-4">
                <div className="w-full md:w-auto flex justify-start items-center">
                    <div className='bg-purple-400 flex  gap-3 md:gap-5 rounded-2xl text-white cursor-pointer mr-4 md:mr-12 place-items-end p-2 md:p-3 border-4 text-xs md:text-base' >
                        <Link href={'/home_page/maintenance/mainte_questions/questions_register'}>
                            <FaRegPlusSquare className="text-white font text-2xl md:text-4xl hover:text-slate-300" />
                        </Link>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <Spinner />) : (
                questions.map((question) => (
                    <QuestionCard key={question.id} prompt_one="Id:" prompt_two="Pregunta:" prompt_three="Descripción:" prompt_fourth="Sección:" handleDeleteQuestion={handleDeleteQuestion} handleModifyQuestion={handleModifyQuestion} {...question} />
                )))}
            <div className="flex justify-center">
                <PaginationBar
                    maintenance={questions}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    changePage={changePage}
                    count={Count}
                />
            </div>
        </div>
    );
};
export default QuestionsMaintenance;