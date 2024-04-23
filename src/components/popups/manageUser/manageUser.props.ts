import { User } from "../../../interfaces/UserContext";

export interface ManageUserProps {
    editUserData: (userName: string, userEmail: string, userPassword: String, userRole: string) => void;
    deleteUser: (userId: number) => void;
    users: User[];
}