import { User } from "@/app/lib/definitions";

const generateUniqueId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 4)}`;
};

/**
 * export type User = {
    id: string,
    email: string,
    full_name: string,
    bio: string | null,
    website: string | null,
    location: string | null,
    phone: string | null,
    birth_date: string | null,
    is_verified: boolean | null,
    is_private: boolean | null,
    is_active: boolean | null,
    created_at: string | null,
    updated_at: string | null,
    username: string | null,
    gender: 'M' | 'F' |  null
}
 * 
 */
export const myUser:User = {
    id: generateUniqueId(),
    email: "omarcisse802@gmail.com",
    full_name: 'Omar Cisse',
    bio: null,
    website: 'cissdev.vercel.app',
    location: null,
    phone: '3213879002',
    birth_date: null,
    is_verified: true,
    is_private: false,
    is_active: true,
    created_at: null,
    updated_at: null,
    username: 'cisspack',
    gender: 'M'

}