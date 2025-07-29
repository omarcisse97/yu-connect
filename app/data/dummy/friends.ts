import { Friends, Friend, Users } from "@/app/lib/definitions";

const generateUniqueId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 4)}`;
};

export const generateFriends = (
    user_id: string,
    users: Users,
    existingFriends: Friends | null,
    friendCount: number = 100
): Friends | null => {
    const retVal: Friends = [];
    let limit = friendCount;
    if (existingFriends && friendCount <= existingFriends.length) {
        return null;
    }

    if (existingFriends) {
        limit = limit - existingFriends.length
    }

    while (retVal.length < limit) {
        const randomIdx = Math.floor(Math.random() * users.length);
        const foundRelation = existingFriends?.find(
            (friend) =>
                (friend.friend_id_1 === user_id && friend.friend_id_2 === users[randomIdx].id) ||
                (friend.friend_id_2 === user_id && friend.friend_id_1 === users[randomIdx].id)) ?? null;
        
        const foundRelation2 = retVal?.find(
            (friend) =>
                (friend.friend_id_1 === user_id && friend.friend_id_2 === users[randomIdx].id) ||
                (friend.friend_id_2 === user_id && friend.friend_id_1 === users[randomIdx].id)) ?? null;

        if (users[randomIdx].id === user_id || foundRelation || foundRelation2) {
            continue;
        }
        retVal.push({
            id: generateUniqueId(),
            friend_id_1: user_id,
            friend_id_2: users[randomIdx].id,
            status: 'active',
            created_at: new Date().toISOString()
        } as Friend)
    }

    return retVal;
}