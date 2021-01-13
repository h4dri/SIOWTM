export interface IUser {
    username: string;
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
    username?: string;
    isDoctor?: boolean;
    subscribe?: boolean;
    startDate?: Date;
    endDate?: Date;
}

export interface IUserUpdate {
    subscribe: boolean;
}