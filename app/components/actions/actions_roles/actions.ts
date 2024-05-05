'use client'
import {RoleXUser} from '@/types';

export const fetchUserRole = async (param: RoleXUser) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  console.log(queryParams)
  const res = await fetch(`/api/rolesxusers?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}
export const fetchRole = async (roleId: string) => {
  const res = await fetch(`/api/roles/?id=${roleId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
  
}

export const postRoleXUser = async (param: RoleXUser): Promise<boolean> => {
  try {
    const response = await fetch('/api/rolesxusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: param.user,
        role: parseInt(param.role,10),
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
export const deleteRole = async (roleId: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/roles/?id=${roleId}`, {
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

export const fetchRoleAll = async () => {
  const res = await fetch(`/api/roles/[id]`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}
export const postUpdateRole = async (id:string,name: string, active: string) => {
  try {
    const response = await fetch('/api/roles/[id]', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:id,
        name: name,
        active:active,
      })
    });
    return response;
  } catch (error) {
    console.error('Error de red', error);
  }
}

export const postRole = async (name: string, active: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/roles/[id]', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        active:parseInt(active, 10),
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