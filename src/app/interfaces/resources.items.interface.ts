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