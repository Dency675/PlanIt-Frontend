import React, { createContext, useContext, useState } from "react";

type UserRoleContextType = {
  userId: string | null;
  userRoles: string[];
  setUserRoles: (roles: string[]) => void;
  setUserId: (userId: string) => void;
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined
);

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(() => {
    // Initialize state from sessionStorage
    const storedUserId = sessionStorage.getItem("userId");
    return storedUserId ? storedUserId : null;
  });

  const [userRoles, setUserRoles] = useState<string[]>(() => {
    // Initialize state from sessionStorage
    const storedRoles = sessionStorage.getItem("userRoles");
    return storedRoles ? JSON.parse(storedRoles) : [];
  });

  return (
    <UserRoleContext.Provider
      value={{ userId, userRoles, setUserRoles, setUserId }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};
