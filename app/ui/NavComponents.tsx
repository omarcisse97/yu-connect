'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    MagnifyingGlassIcon,
    HomeIcon,
    UserGroupIcon,
    BellIcon,
    ChatBubbleLeftIcon,
    PlusIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {
    HomeIcon as HomeIconSolid,
    UserGroupIcon as UserGroupIconSolid,
    BellIcon as BellIconSolid,
    ChatBubbleLeftIcon as ChatBubbleLeftIconSolid
} from '@heroicons/react/24/solid';
import { useDummy } from '../providers/dummy';
import { UsersData } from '../lib/definitions';
import UserAvatar from './UserAvatar';

interface User {
    id: string;
    username: string;
    full_name: string;
    avatar_url?: string;
    is_verified?: boolean;
    is_private?: boolean;
    followers_count?: number;
}

interface UserSearchDropdownProps {
    onUserSelect?: (user: User) => void;
    onSearch?: (query: string) => void;
    searchResults?: UsersData;
    isLoading?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
    className?: string;
}
export const navItems = [
    {
        name: 'Home',
        path: '/',
        icon: HomeIcon,
        iconSolid: HomeIconSolid,
    },
    {
        name: 'Friends',
        path: '/friends',
        icon: UserGroupIcon,
        iconSolid: UserGroupIconSolid,
    },
    {
        name: 'Messages',
        path: '/messages',
        icon: ChatBubbleLeftIcon,
        iconSolid: ChatBubbleLeftIconSolid,
        badge: 0,
    },
    {
        name: 'Notifications',
        path: '/notifications',
        icon: BellIcon,
        iconSolid: BellIconSolid,
        badge: 0,
    },
];

export const SearchDropdown: React.FC<UserSearchDropdownProps> = ({
    onUserSelect,
    onSearch,
    searchResults = [],
    isLoading = false,
    placeholder = "Search people...",
    autoFocus = false,
    className = ""
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<UsersData>([]);
    const searchRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { users } = useDummy();



    const dummySearch = async (query: string) => {
        if (users) {
            // Simulate API delay
            // await new Promise(resolve => setTimeout(resolve, 300));
            const result = users.filter((user) => {
                return user.user?.full_name.toLowerCase().includes(query.toLowerCase()) || user.user?.email.toLowerCase().includes(query.toLowerCase());
            })
                .sort((a, b) => {

                    const aNameStartsWith = a.user?.full_name.toLowerCase().startsWith(query.toLowerCase());
                    const bNameStartsWith = b.user?.full_name.toLowerCase().startsWith(query.toLowerCase());

                    if (aNameStartsWith && !bNameStartsWith) return -1;
                    if (!aNameStartsWith && bNameStartsWith) return 1;
                    return 0;
                })
                .slice(0, 5);
            setResults(result);
        }
    }

    useEffect(() => {
        if (searchResults.length > 0) {
            setResults(searchResults);
        }
    }, [searchResults]);

    useEffect(() => {

        if (searchQuery.trim() && searchResults.length === 0) {
            dummySearch(searchQuery);
        } else if (!searchQuery.trim()) {
            setResults([]);
        }
    }, [searchQuery, searchResults.length]);


    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (onSearch) {
                onSearch(searchQuery);
            }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [searchQuery, onSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    useEffect(() => {
        if (autoFocus && searchRef.current) {
            searchRef.current.focus();
        }
    }, [autoFocus]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsOpen(true);
    };

    const handleUserClick = (user: User) => {
        onUserSelect?.(user);
        setSearchQuery('');
        setIsOpen(false);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setResults([]);
        setIsOpen(false);
        searchRef.current?.focus();
    };

    return (
        <div className={`relative w-full ${className}`}>
            {/* Search Input */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-2xl bg-gray-50/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm text-gray-900"
                />
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-2xl transition-colors"
                    >
                        <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                )}
            </div>

            {/* Search Dropdown */}
            {isOpen && (searchQuery.trim() || results.length > 0) && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-96 overflow-hidden z-50"
                >
                    {isLoading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="text-sm text-gray-500 mt-3">Searching...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <>
                            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    People ({results.length})
                                </h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {results.map((user) => (
                                    <Link
                                        href={`/profile/${user.user?.username}`}
                                        key={user?.user?.id}
                                        className="w-full px-4 py-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left"
                                    >
                                        {user &&
                                            <UserAvatar
                                                user={user.user}
                                                avatar={user.avatar}
                                                size="headonly"
                                                direction="down-right"
                                                head_direction="down-right"
                                                action="idle"
                                                gesture="normal"
                                                item={null}
                                                bgColor={user.avatar?.gender === 'M' ? 'blue' : 'pink'}
                                            />
                                        }

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <p className="font-semibold text-gray-900 truncate">
                                                    {user.user?.full_name}
                                                </p>
                                                {/* {user.is_verified && (
                                                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                )} */}
                                                {user && user?.user?.is_private && (
                                                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-500 truncate">@{user?.user?.username}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {searchQuery.trim() && (
                                <div className="border-t border-gray-100">
                                    <Link
                                        href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                                        className="w-full px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors text-sm font-medium text-blue-600 hover:text-blue-700"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <MagnifyingGlassIcon className="h-4 w-4" />
                                        <span>View all results for "{searchQuery.trim()}"</span>
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : searchQuery.trim() && !isLoading ? (
                        <div className="p-8 text-center text-gray-500">
                            <MagnifyingGlassIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-sm font-medium mb-1">No results found</p>
                            <p className="text-xs">Try searching for a different name or username</p>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export const NavLink = ({ item, isActive }: { item: typeof navItems[0], isActive: (path: string) => boolean }) => {
    const active = isActive(item.path);
    const Icon = active ? item.iconSolid : item.icon;

    return (
        <Link
            href={item.path}
            className={`relative flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${active
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
            title={item.name}
        >
            <Icon className="h-6 w-6" />
            {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item.badge > 9 ? '9+' : item.badge}
                </span>
            )}
        </Link>
    );
};
