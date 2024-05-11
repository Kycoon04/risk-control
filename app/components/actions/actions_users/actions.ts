import {User} from '@/types';

export const postUser = async (param: User) => {
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
  
      return response;
    } catch (error) {
      console.error('Error de red', error);
    }
  }
  export const postDataUser = async (department: string, name: string, second_name: string, surname: string, second_surname: string, email: string, identification: string, nickname: string, phone_number: string) => {
    try {
      const response = await fetch('/api/users/[id]?id=${email}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          department: department,
          name: name,
          second_name: second_name,
          surname: surname,
          second_surname: second_surname,
          email: email,
          identification: identification,
          nickname: nickname,
          phone_number: phone_number
        })
      });
      return response;
    } catch (error) {
      console.error('Error de red', error);
    }
  }
  export const postUpdateUser = async (id:string,department: string, name: string, second_name: string, surname: string, second_surname: string, email: string, identification: string, nickname: string, phone_number: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:id,
          department: department,
          name: name,
          second_name: second_name,
          surname: surname,
          second_surname: second_surname,
          email: email,
          identification: identification,
          nickname: nickname,
          phone_number: phone_number
        })
      });
      return response;
    } catch (error) {
      console.error('Error de red', error);
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