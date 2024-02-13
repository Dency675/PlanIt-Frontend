// import React, { createContext, useContext, useState, ReactNode } from "react";

// export interface TeamIDContextType {
//   teamID: string | null;
//   setTeamID: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const TeamIDContext = createContext(null);

// export const TeamIdProvider = ({ children }: { children: ReactNode }) => {
//   const [teamID, setTeamID] = useState<string | null>(null);
//   return (
//     <TeamIDContext.Provider value={(teamID, setTeamID)}>
//       {children}
//     </TeamIDContext.Provider>
//   );
// };

// export const useTeamID = () => {
//   const context = useContext(TeamIDContext);
//   if (!context) {
//     throw new Error("useTeamID must be used within a TeamIDProvider");
//   }
//   return context;
// };

export {};
