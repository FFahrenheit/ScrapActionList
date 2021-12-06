export interface Part{
    number: string,
    area: string,
    department: string,
    location: string,
    client: string,
    id_client?: string
}

export interface Defective{
    description: string,
    id?: number
}

export interface Participant{
    username: string,
    name: string,
    email: string,
    position?: string
}

export interface Department{
    id: number,
    name: string,
    manager: string
}