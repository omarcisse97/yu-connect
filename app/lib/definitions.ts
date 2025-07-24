import { Avatar } from "../models/AvatarSchema"
import { Palettes, SetTypes } from "./definitions-avatar"

export type AvatarAssets = {
    palettes: Palettes,
    setTypes: SetTypes,
}
export type AvatarAssetsList = AvatarAssets[]

export type AvatarMetadata = {
    id: string,
    user_id: string,
    figure: string,
    gender: 'M' | 'F',
    created_at: string | null,
    updated_at: string | null
}
export type User = {
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
    gender: 'M' | 'F' | null
}
export type Users = User[];

export type UserData = {
    user: User | null,
    avatarMetadata: AvatarMetadata | null,
    avatar: Avatar | null
}
export type UsersData = UserData[];

export type Friend = {
    id: string,
    friend_id_1: string,
    friend_id_2: string,
    status: string | null,
    created_at: string | null
}
export type Friends = Friend[];


export type Comment = {
    id: string,
    post_id: string,
    user_id: string,
    parent_comment_id: string | null,
    content: string,
    media_url: string | null,
    likes_count: number | null,
    replied_count: number | null,
    is_pinned: boolean | null,
    created_at: string | null,
    updated_at: string | null
}
export type Comments = Comment[];

export type Post = {
    id: string,
    user_id: string,
    content: string,
    media_urls: string[] | null,
    media_type: string | null,
    is_pinned: boolean | null,
    is_archived: boolean | null,
    location: string | null,
    tags: string[] | null,
    mentions: string[] | null,
    visibility: string | null,
    comments_enabled: boolean | null,
    like_count: number | null,
    comments_count: number | null,
    shares_count: number | null,
    views_count: number | null,
    created_at: string,
    updated_at: string | null
}
export type Posts = Post[];

export type Like = {
    id: string,
    user_id: string,
    post_id: string,
    comment_id: string | null;
    created_at: string | null
} 
export type Likes = Like[];
