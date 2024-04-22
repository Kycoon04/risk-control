import {User} from '@/provider/types';

export const postUser = async (param: User): Promise<boolean> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          department: param.department,
          name: param.name,
          second_name: param.second_name,
          surname: param.surname,
          second_surname: param.second_surname,
          email: param.email,
          identification: param.identification,
          nickname: param.nickname,
          phone_number: param.phone_number
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

export const fetchUsers = async (param: User) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/users/[id]?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }

export const deleteUser = async (userId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/users/[id]?id=${userId}`, {
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