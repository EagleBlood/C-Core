import { User } from "../../../interfaces/UserContext";

export interface ManageUserProps {
    user: User;
    editUserData: (userId: number, userName: string, userEmail: string, userRole: string, isAdmin: boolean , isActive: boolean) => void;
    deleteUser: (userId: number) => void;
    onCancel: () => void;
    onUserDataChange: (newData: User) => void;
}