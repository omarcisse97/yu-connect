'use client'

import { useEffect, useState } from 'react';
import { Friend, Friends, UserData, UsersData } from "@/app/lib/definitions";
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
import { FriendCard } from './cards';



const FriendsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'friends' | 'requests' | 'suggestions'>('all');
    const [friends, setFriends] = useState<Friends | null>(null);
    const { getUserByID } = useDummy();
    const { user } = useAuth();

    useEffect(() => {
        if (user && user?.friends) {
            setFriends(
                searchTerm === '' ?
                    [...user.friends]
                    : user.friends.filter((f) => {
                        const temp = getUserByID(
                            f.friend_id_1 === user.user.id ?
                                f.friend_id_2
                                : f.friend_id_1);
                        return temp && (
                            temp.user?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            temp.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    }) as Friends
            )
        }
    }, [user, searchTerm]);

    const getFriendStatus = (status: string | null): 'friend' | 'request' | 'none' => {
        switch (status) {
            case 'active': return 'friend';
            case 'request': return 'request';
            default: return 'none';
        }

    };

    const getFilteredByTab = (): Friends => {
        if (friends) {
            switch (activeTab) {
                case 'friends':
                    return friends.filter(friend => getFriendStatus(friend.status) === 'friend');
                case 'requests':
                    return friends.filter(friend => getFriendStatus(friend.status) === 'request');
                case 'suggestions':
                    return friends.filter(friend => getFriendStatus(friend.status) === 'none');
                default:
                    return friends;
            }
        }
        return [];

    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Friends</h1>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search friends..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                    />
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {[
                        { key: 'all', label: 'All' },
                        { key: 'friends', label: 'Friends' },
                        { key: 'requests', label: 'Requests' },
                        
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.key
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Friends Grid */}
            <div className="space-y-4">
                {getFilteredByTab().length > 0 ? (
                    getFilteredByTab().map(friend => (
                        <FriendCard
                            key={friend.id}
                            friend={friend}
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                            <UserPlusIcon className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {activeTab === 'friends' ||
                                activeTab == 'all' ?
                                'No friends yet!'
                                : activeTab === 'requests' ?
                                    'No friends request received or sent'
                                    : 'No friends found that match criteria'
                            }
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'Try a different search term' : 'Start connecting with people!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default FriendsList;
