export type FormState = {
    success?: boolean
    message?: string
}

export type Unit = {
    id: number
    block: {
        id: num
        name: string
    }
    num: number
    status: {
        id: num
        name: string
    }
}

export type Block = {
    id: number
    name: string
    unit_count: number
    created_at: string | null
}

export type Status = {
    id: number
    name: string
    unit_count: number
    created_at: string | null
}

export type Type = {
    id: number
    building: number
    land: number
    unit_count: number
    created_at: string | null
}

export type Profile = {
    id: number
    image: string | null
    name: string
    username: string
    created_at: string | null
}
