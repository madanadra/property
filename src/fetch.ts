'use server'

import { Unit, Block, Status, Type, Profile } from "./typing"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import axios, { AxiosError } from "axios"

// Data fetch

export async function readUnits() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/read-units', {
        headers: {
            'Authorization': 'Bearer '+cookies().get('ind-property-token')?.value,
            'Accept': 'application/json'
        },
        cache: 'no-cache',
        next: {
            tags: ['read-units']
        }
    })

    if (res.status === 401) redirect('/login')
    if (!res.ok) return {error: res.status}

    const json = await res.json()
    const data: Unit[] = json.units
    
    return {data: data}
}

export async function readBlocks() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/read-blocks', {
        headers: {
            'Authorization': 'Bearer '+cookies().get('ind-property-token')?.value,
            'Accept': 'application/json'
        },
        cache: 'no-cache',
        next: {
            tags: ['read-blocks']
        }
    })

    if (res.status === 401) redirect('/login')
    if (!res.ok) return {error: res.status}

    const json = await res.json()
    const data: Block[] = json.blocks
    
    return {data: data}
}

export async function readStatuses() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/read-statuses', {
        headers: {
            'Authorization': 'Bearer '+cookies().get('ind-property-token')?.value,
            'Accept': 'application/json'
        },
        cache: 'no-cache',
        next: {
            tags: ['read-statuses']
        }
    })

    if (res.status === 401) redirect('/login')
    if (!res.ok) return {error: res.status}

    const json = await res.json()
    const data: Status[] = json.statuses
    
    return {data: data}
}

export async function readTypes() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/read-types', {
        headers: {
            'Authorization': 'Bearer '+cookies().get('ind-property-token')?.value,
            'Accept': 'application/json'
        },
        cache: 'no-cache',
        next: {
            tags: ['read-types']
        }
    })

    if (res.status === 401) redirect('/login')
    if (!res.ok) return {error: res.status}

    const json = await res.json()
    const data: Type[] = json.types
    
    return {data: data}
}

export async function readProfile() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/read-profile', {
        headers: {
            'Authorization': 'Bearer '+cookies().get('ind-property-token')?.value,
            'Accept': 'application/json'
        },
        cache: 'no-cache',
        next: {
            tags: ['read-profile']
        }
    })

    if (res.status === 401) redirect('/login')
    if (!res.ok) return {error: res.status}

    const json = await res.json()
    const data: Profile = json.user

    return {data: data}
}


// Error handling

function handleError(err: AxiosError) {
    if (err.response?.status === 401) redirect('/login')

    return {message: 'Kode kesalahan ' + err.response?.status}
}


// Action fetch

export async function logIn(_current: any, e: FormData) {
    const username = e.get('username')
    const password = e.get('password')

    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/log-in', 
        {username: username, password: password})

        if (data.message) return {message: data.message}

        const token: string = data.token
        cookies().set('ind-property-token', token, { 
            httpOnly: true,
            secure: true,
            sameSite: true,
            maxAge: 3600*24*7,
        })
        return {success: true}

    } catch (err) {
        handleError(err as AxiosError)
    }
}

export async function logOut(_current: any) {
    try {
        await axios.delete(process.env.NEXT_PUBLIC_BASE_API+'/log-out', 
        {
            headers: { Authorization: 'Bearer ' + cookies().get('ind-property-token')?.value }
        })

        cookies().delete('ind-property-token')
        return {success: true}

    } catch (err) {
        handleError(err as AxiosError)
    }
}

export async function clearLogOut(_current: any) {
    try {
        await axios.delete(process.env.NEXT_PUBLIC_BASE_API+'/clear-log-out', 
        {
            headers: { Authorization: 'Bearer ' + cookies().get('ind-property-token')?.value }
        })

        cookies().delete('ind-property-token')
        return {success: true}

    } catch (err) {
        handleError(err as AxiosError)
    }
}

export async function createUnit(_current: any, e: FormData) {
    const block_id = e.get('block-id')
    const num = e.get('num')
    const status_id = e.get('status-id')
    const type_id = e.get('type-id')
    const price = e.get('price')

    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-unit', 
        {
            block_id: block_id,
            num: num,
            status_id: status_id,
            type_id: type_id, 
            price: price
        }, 
        {
            headers: { Authorization: 'Bearer ' + cookies().get('ind-property-token')?.value }
        })

        if (data.message) return {message: data.message}

        revalidateTag('read-units')
        return {success: true}

    } catch (err) {
        handleError(err as AxiosError)
    }
}

export async function updateImage(_current: any, e: FormData) {
    const image = e.get('image') as File

    const newImage = new FormData()
    newImage.append('image', image, image.name)

    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/update-image', 
        newImage, 
        {
            headers: { Authorization: 'Bearer ' + cookies().get('ind-property-token')?.value }
        })

        if (data.message) return {message: data.message}

        revalidateTag('read-profile')

    } catch (err) {
        handleError(err as AxiosError)
    }
}

export async function updateName(_current: any, e: FormData) {
    const name = e.get('name')

    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/update-name', 
        {name: name}, 
        {
            headers: { Authorization: 'Bearer ' + cookies().get('ind-property-token')?.value }
        })

        if (data.message) return {message: data.message}

        revalidateTag('read-profile')

    } catch (err) {
        handleError(err as AxiosError)
    }
}
