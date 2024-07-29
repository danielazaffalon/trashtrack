export enum Role {
    normal = 'normal',
    operator = 'operator'
}

export enum ContainerType{
    glass = 'glass',
    paper = 'paper',
    plastic = 'plastic',
    clothes = 'clothes',
    special = 'special',
    organic = 'organic',
    ordinary = 'ordinary'
}

export interface IUser{
    firstName: string,
    lastName: string,
    role: Role,
    img?: string,
    ratio?: number,
    containersTypes?: ContainerType[]
}

export interface UserAuth{
    email: string,
    password: string
}

export type IncidentType = 'damage' | 'full' | 'moved';

export interface Incident {
    userId?: string;
    containerId?: string;
    type: IncidentType;
    description: string;
    images?: string[];
}

export interface Container {
    id?: string;
    type: ContainerType;
    level: number;
    location: {
        lat: number;
        lng: number;
    };
    name: string;
    register_id: number;
    address: string;
    incidents?: [];
}

export interface IPhoto {
    fileName: string;
    base64Data: string;
    webviewPath?: string;
}