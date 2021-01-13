export interface IUser {
    userName: string;
    displayName: string;
    token: string;
    image?: string;
    isDoctor: boolean;
    subscribe: boolean;
    startDate: Date;
    endDate: Date;
}

export interface IUserFromValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
    isDoctor?: boolean;
    subscribe?: boolean;
    startDate?: Date;
    endDate?: Date;
}

export interface IUserUpdate {
    subscribe: boolean;
}