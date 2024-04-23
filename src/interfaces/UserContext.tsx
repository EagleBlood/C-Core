import { createContext } from "react";

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
};
  
export interface UserContextProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}
  
export const UserContext = createContext<UserContextProps | undefined>(undefined);