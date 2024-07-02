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