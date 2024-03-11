import React, { createContext, useContext, useState } from "react";
import { notifType } from "./type";

interface NotificationContextType {
  notifications: notifType["notif"][];
  setNotifications: React.Dispatch<React.SetStateAction<notifType["notif"][]>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<notifType["notif"][]>([]);

  const contextValue: NotificationContextType = {
    notifications,
    setNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
