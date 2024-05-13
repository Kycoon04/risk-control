import { fetchUsers, fetchUserRole, fetchRole } from '../actions/actions';
import { RoleXUser, User } from '@/types';

export const fetchUserRol = async (props: RoleXUser) => {
    const fetchedRoleXUser = await fetchUserRole(props);
    const fetchedRoles = await Promise.all(fetchedRoleXUser.props.data.map(async (role: RoleXUser) => {
      const fetchedRole = await fetchRole(role.role);
      return fetchedRole.props.data;
  }));
  return fetchedRoles;
  };

export const fetchUser = async (props: User) => {
    const fetchedForms = await fetchUsers(props);
    return fetchedForms.props.data;
  };