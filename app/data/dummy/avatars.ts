import { AvatarMetadata } from "@/app/lib/definitions"

const generateUniqueId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 4)}`;
};

export const generateAvatarMetadata = (user_id: string, gender: string, figure: string) => {
    return {
        id: generateUniqueId(),
        user_id: user_id,
        figure: figure,
        gender: gender,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()

    } as AvatarMetadata;
}