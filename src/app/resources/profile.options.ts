import { DashboardOption } from "../interfaces/dashboard.profile.item.interface";

export const publicOptions : DashboardOption[] = [
    {
        title: 'Logout',
        icon: 'fas fa-sign-out-alt pr-1',
        listener: 'logout'
    }
];