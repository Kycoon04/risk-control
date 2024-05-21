import Question from './question';
import { ParamQuestions, Options } from '@/types';

export const renderQuestions = (questions: ParamQuestions[], allOptions: Options[][], selectedOptions: { [key: string]: string | null }, handleButtonClick: (questionId: string, optionSelect: string) => void, page: number, QuestionsPerPage: number) => {
    const startIndex = (page - 1) * QuestionsPerPage;
    const endIndex = startIndex + QuestionsPerPage;
    const renderedQuestions = questions
        .slice(startIndex, endIndex)
        .map((q, index) => {
            const questionIndex = (page - 1) * QuestionsPerPage + index;
            const optionsForQuestion = questionIndex < allOptions.length ? allOptions[questionIndex] : [];

            const mappedOptions = optionsForQuestion.map(option => ({
                id: option.id,
                option: option.option
            }));
            return (
                <Question
                    key={q.id}
                    options={mappedOptions}
                    question={q.question}
                    title={q.description}
                    selectedOption={selectedOptions[q.id] || null}
                    onButtonClick={(option) => handleButtonClick(q.id, option)}
                />
            );
        });
    return renderedQuestions;
};