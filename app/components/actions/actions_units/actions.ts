'use client'
import {ParamUnit} from '@/types';
export const fetchUnit = async (param: ParamUnit) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/units/[id]?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }
  export const deleteUnit = async (unitId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/units/[id]?id=${unitId}`, {
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