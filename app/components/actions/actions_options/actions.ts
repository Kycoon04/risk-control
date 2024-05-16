import {ParamOption} from '@/types';

export const fetchOptions = async (param: ParamOption) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/options?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }

  export const deleteOption = async (optionId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/options?id=${optionId}`, {
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
  export const postUpdateOption = async (id:string,option: string, question: string, score:string) => {
    try {
      const response = await fetch('/api/options/[id]', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:parseInt(id, 10),
          option: option,
          question:parseInt(question, 10),
          socre:parseInt(score, 10),
        })
      });
      return response;
    } catch (error) {
      console.error('Error de red', error);
    }
  }