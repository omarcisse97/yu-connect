'use client'

import { useState } from 'react';
import { Friend, UserData } from "@/app/lib/definitions";
import { Avatar } from "@/app/models/AvatarSchema";
import UserAvatar from "../UserAvatar";
import { 
    MagnifyingGlassIcon, 
    UserPlusIcon, 
    UserMinusIcon,
    CheckIcon,
    XMarkIcon 
} from "@heroicons/react/24/outline";
import { useDummy } from '@/app/providers/dummy';
import { useAuth } from '@/app/providers/auth';
import Link from 'next/link';

// Friend Card Component
interface FriendCardProps {
    friend: Friend;
   
}

export const FriendCard = ({ friend}: FriendCardProps) => {
    const { getUserByID } = useDummy();
    const { user, updateFriend } = useAuth();
    const friendIn = getUserByID(friend.friend_id_1 === user?.user.id? friend.friend_id_2: friend.friend_id_1) as UserData;
    if(!friendIn){
        return <></>;
    }

    const getActionButton = () => {
        switch (friend.status) {
            case 'active':
                return (
                    <button
                        onClick={() => updateFriend(friend,'remove')}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <UserMinusIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Remove</span>
                    </button>
                    
                );
            case 'request':
                if(friend.friend_id_1 === user?.user.id){
                    return (
                    <div className="flex items-center space-x-2 px-4 py-2 text-gray-500 bg-gray-100 rounded-lg">
                        <span className="text-sm">Pending</span>
                    </div>
                );
                } else {
                    return (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => updateFriend(friend,'active')}
                            className="flex items-center space-x-1 px-3 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                        >
                            <CheckIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">Accept</span>
                        </button>
                        <button
                            onClick={() => updateFriend(friend, 'remove')}
                            className="flex items-center space-x-1 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                );
                }
                
            default:
                return (
                    <button
                        onClick={() => updateFriend(friend, 'request')}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        <UserPlusIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Add Friend</span>
                    </button>
                );
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <Link href={`/profile/${friendIn?.user?.username}`}>
                <div className="flex items-center space-x-3">
                    <UserAvatar
                        user={friendIn.user}
                        avatar={friendIn.avatar}
                        size="headonly"
                        direction="down-right"
                        head_direction="down-right"
                        action="idle"
                        gesture="normal"
                        item={null}
                    />
                    {friendIn && friendIn.user?.full_name && friendIn.user.username && <div>
                        <h3 className="font-semibold text-gray-900">{friendIn.user.full_name}</h3>
                        <p className="text-sm text-gray-500">@{friendIn.user.username}</p>
                        
                    </div>}
                </div>
                </Link>
                {getActionButton()}
            </div>
        </div>
    );
};