import { createContext } from "react";

export type User = {
    _id: string;
    email: string;
    name: string;
    role: string;
    isAdmin: boolean;
    active: boolean;
};
  
export interface UserContextProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}
  
export const UserContext = createContext<UserContextProps | undefined>(undefined);