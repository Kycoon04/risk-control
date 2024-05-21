import {ParamSection, paramsSection, ParamQuestions, Options, Section, Answers, Form, User} from '@/types';
import { fetchOptions, fetchQuestion, postAnswer } from '@/app/components/actions/actions';
import { putForms } from '@/app/components/actions/actions_forms/actions';
  export const fetchSections = async (param: paramsSection) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/sections/[id]?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }

  export const deleteSection = async (sectionId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/sections/[id]?id=${sectionId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error de red', error);
      return false;
    }
  }
  export const fetchedSections = async (param: ParamSection) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/sections/[id]?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }
  export const putSection = async (param: paramsSection): Promise<boolean> => {
    try {
      const response = await fetch('/api/sections/[id]', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: param.id,
          name: param.name,
          description: param.description,
          forms: param.forms,
          complete: param.complete
        })
      });
  
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error de red', error);
      return false;
    }
  }
  export const putUpdateSection = async (param: ParamSection): Promise<boolean> => {
    try {
      const response = await fetch('/api/sections/[id]', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: param.id,
          name: param.name,
          description: param.description,
          forms: parseInt(param.forms, 10),
          complete: param.complete
        })
      });
  
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error de red', error);
      return false;
    }
  }


  export const postSection = async (name: string, description: string,forms:string,complete:string): Promise<boolean> => {
    try {
      const response = await fetch('/api/sections/[id]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description:description,
          forms: parseInt(forms, 10),
          complete: complete
        })
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error de red', error);
      return false;
    }
  }

  export const fetchDataForSection = async (sectionId: string, formsId: string | undefined, setQuestions: React.Dispatch<React.SetStateAction<ParamQuestions[]>>, setSections: React.Dispatch<React.SetStateAction<Section[]>>, setAllOptions: React.Dispatch<React.SetStateAction<Options[][]>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsLoading(true);
    const paramQuestion: ParamQuestions = {
        id: "",
        question: "",
        description: "",
        section: sectionId,
    };
    const fetchedSections = await fetchQuestion(paramQuestion);
    setQuestions(fetchedSections.props.data);

    const param: paramsSection = {
        id: "",
        forms: formsId?.toString(),
        name: "",
        description: "",
        complete: "",
    };
    const fetchedAllSections = await fetchSections(param);
    setSections(fetchedAllSections.props.data);

    const fetchedOptionsPromises = fetchedSections.props.data.map(async (q: ParamQuestions) => {
        const paramOptions: Options = {
            id: "",
            option: "",
            question: q.id,
            score: "",
            TlQuestions: {
                id: "",
                question: "",
                description: "",
                section: "",
            }
        };
        const fetchedOptions = await fetchOptions(paramOptions);
        return fetchedOptions.props.data;
    });
    const fetchedOptions = await Promise.all(fetchedOptionsPromises);
    setAllOptions(fetchedOptions);
    setIsLoading(false);
};

export const postAnswersSection = async (selectedOptions: { [key: string]: string | null }, section: Section, forms: Form | undefined, sections: Section[], user: User | null) => {

  for (const option of Object.values(selectedOptions)) {
      const paramAnswer: Answers = {
          user: user?.id,
          option: option
      };
      await postAnswer(paramAnswer);
  }

  const paramSection: paramsSection = {
      id: section.id,
      name: section.name,
      forms: section.forms,
      description: section.description,
      complete: "Completado",
  };
  await putSection(paramSection);

  const updatedSections = sections.map(sec => {
      return sec.id === section.id ? { ...sec, complete: "Completado" } : sec;
  });
  const allSectionsCompleted = updatedSections.every(sec => sec.complete === "Completado");

  if (allSectionsCompleted) {
      const paramForms: Form = {
          id: forms?.id || "",
          name: forms?.name || "",
          state: forms?.state || "",
          inicialperiod: forms?.inicialperiod || "",
          finalperiod: forms?.finalperiod || "",
          complete: "Completado"
      };
      await putForms(paramForms);
  }
};