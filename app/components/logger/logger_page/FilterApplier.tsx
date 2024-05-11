import { Logger } from '@/types';

export const applyFilters = (
  unfilteredLoggers: Logger[],
  filters: Partial<Logger>,
  setLoggers: React.Dispatch<React.SetStateAction<Logger[]>>
) => {
  const filteredLoggers = unfilteredLoggers.filter(logger => {
    return Object.keys(filters).every(key => {
      if (key === "date") {
        const filterDate = filters.date ? new Date(filters.date).toISOString().split('T')[0] : "";
        const loggerDate = new Date(logger.date).toISOString().split('T')[0];
        return filterDate === "" || loggerDate === filterDate;
      }
      return logger[key as keyof Logger]
        .toLowerCase()
        .includes((filters[key as keyof Logger] || "").toLowerCase());
    });
  });
  setLoggers(filteredLoggers);
};
