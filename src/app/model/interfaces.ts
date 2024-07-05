export enum Role {
    normal = 'normal',
    operator = 'operator'
}

export enum ContainerType{
    glass = 'glass',
    paper = 'paper',
    plastic = 'plastic',
    clothes = 'clothes',
    oil = 'oil'
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

export enum IncidentType {
    damage = 'damage',
    full = 'full',
    moved = 'moved',
}

export interface ImageObject {
    src: string;
}

export interface Incident {
    userId: string;
    type: IncidentType;
    description: string;
    images: ImageObject[];
}