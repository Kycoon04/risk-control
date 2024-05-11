import { fectLogger } from "../../../api/logger/actions";
import { Logger } from '@/types';

export const fetchData = async (filters: Partial<Logger>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setLoggers: React.Dispatch<React.SetStateAction<Logger[]>>, setUnfilteredLoggers: React.Dispatch<React.SetStateAction<Logger[]>>) => {
    setIsLoading(true);
    const filteredFilters: Logger = {
        usuario: filters.usuario || "",
        transaction_type: filters.transaction_type || "",
        role: filters.role || "",
        transaction: filters.transaction || "",
        ip: filters.ip || "",
        date: filters.date || ""
    };
    const fetchedSections = await fectLogger(filteredFilters);
    setLoggers(fetchedSections.props.data);
    setUnfilteredLoggers(fetchedSections.props.data);
    setIsLoading(false);
};
