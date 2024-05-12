// import Question from './question';
// import { ParamQuestions, Options } from '@/types';

// interface RenderQuestionsProps {
//     questions: ParamQuestions[]; // Reemplaza QuestionType con el tipo correcto
//     page: number;
//     QuestionsPerPage: number;
//     questionData: ParamQuestions[]; 
//     selectedOptions: { [key: string]: string | null }; 
//     allOptions: Options[][];
//     handleButtonClick: (id: string, option: string) => void; 
// }


// const RenderQuestions: React.FC<RenderQuestionsProps> = ({ questions, page, QuestionsPerPage, allOptions, selectedOptions, handleButtonClick }) => {
//     const startIndex = (page - 1) * QuestionsPerPage;
//     const endIndex = startIndex + QuestionsPerPage;

//     const questionData = questions.map((question, index) => {
//         const optionsForQuestion = allOptions[index] || [];
//         return {
//             id: question.id,
//             text: question.question,
//             question: question.description,
//             options: {
//                 id: optionsForQuestion.map(option => option.id),
//                 option: optionsForQuestion.map(option => option.option),
//             }
//         };
//     });

//     return (
//         <>
//             {questions.slice(startIndex, endIndex).map((q, index) => {
//                 const questionIndex = (page - 1) * QuestionsPerPage + index;
//                 const optionsForQuestion = questionIndex < questionData.length ? questionData[questionIndex] : { id: [], option: [] };

//                 const mappedOptions = optionsForQuestion.id.map((id, index) => ({
//                     id,
//                     option: optionsForQuestion.option[index]
//                 }));

//                 return (
//                     <Question
//                         key={q.id}
//                         options={mappedOptions}
//                         question={q.question}
//                         title={q.description}
//                         selectedOption={selectedOptions[q.id] || null}
//                         onButtonClick={(option) => handleButtonClick(q.id, option)}
//                     />
//                 );
//             })}
//         </>
//     );
// };

// export default RenderQuestions;