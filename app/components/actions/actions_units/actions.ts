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
  export const postUpdateUnit = async (id:string,name: string, description: string) => {
    try {
      const response = await fetch('/api/units/[id]', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:id,
          name: name,
          description:description,
        })
      });
      return response;
    } catch (error) {
      console.error('Error de red', error);
    }
  }
  export const postUnit = async (name: string, description: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/units/[id]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description:description,
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