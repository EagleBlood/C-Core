import { User } from "../../../interfaces/UserContext";

export interface ManageUserProps {
    user: User;
    editUserData: (userId: number, userName: string, userEmail: string, userPassword: string, userRole: string) => void;
    deleteUser: (userId: number) => void;
    onUpdate: (user: User) => void;
    onCancel: () => void;
}