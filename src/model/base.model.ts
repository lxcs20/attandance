export interface IBaseModel {
    uuid?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
    SUPER = 'super',
}

