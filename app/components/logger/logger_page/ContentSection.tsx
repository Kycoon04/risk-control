import React from "react";
import Spinner from "../../notifications/Spinner";
import PreviewLogger from "../preview_logger";
import PaginationBar from "./paginationBar";
import { Logger } from '@/types';

interface ContentSectionProps {
  isLoading: boolean;
  currentItems: Logger[];
  loggers: Logger[];
  itemsPerPage: number;
  currentPage: number;
  changePage: (pageNumber: number) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({ isLoading, currentItems, loggers, itemsPerPage, currentPage, changePage }) => {
  return (
    <div className="m-5 p-2 flex flex-col">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
            {currentItems.map((logger) => (
              <PreviewLogger
                usuario={logger.usuario}
                transaction_type={logger.transaction_type}
                role={logger.role}
                transaction={logger.transaction}
                ip={logger.ip}
                date={logger.date}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <PaginationBar
              loggers={loggers}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              changePage={changePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ContentSection;
