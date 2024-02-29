export interface User {
  id: string;
  employeeId: string;
  givenName: string;
  surName: string;
  email: string;
  department: string;
  jobTitle: string;
  joinDate: string;
  lastLoginTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  employeeRoleMappings: {
    id: number;
    userId: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface UsersResponse {
  message: string;
  data: User[];
}
