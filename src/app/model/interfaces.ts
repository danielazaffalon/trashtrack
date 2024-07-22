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
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
    img?: string,
    ratio?: number,
    containersTypes?: ContainerType[]
}

export type IncidentType = 'damage' | 'full' | 'moved';

export interface ImageObject {
    src: string;
}

export interface Incident {
    userId?: string;
    containerId?: string;
    type: IncidentType;
    description: string;
    images?: ImageObject[];
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