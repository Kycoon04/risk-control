'use client'
import { ParamQuestions} from '@/provider/types';

export const fetchQuestion = async (param: ParamQuestions) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/questions/[id]?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }
  export const deleteQuestion = async (questionId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/questions/[id]?id=${questionId}`, {
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