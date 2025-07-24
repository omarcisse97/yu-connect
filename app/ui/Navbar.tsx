'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/providers/auth';
import { useAvatar } from '@/app/providers/avatar';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';


import { SearchDropdown } from '@/app/ui/NavComponents';
import NavbarSkeleton from '@/app/ui/skeletons';
import UserAvatar from '@/app/ui/UserAvatar';
import { NavLink, navItems } from '@/app/ui/NavComponents';



const Navbar = () => {
    const pathname = usePathname();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const { user, logout } = useAuth();
    const { avatar } = useAvatar();
    const routes = pathname.split('/');
    const currentParent = routes?.[1] === undefined ? routes?.[0] : routes?.[1];
    const isActive = (path: string) => {
        const tempRoutes = path.split('/');
        const tempParent = tempRoutes?.[1] === undefined ? tempRoutes?.[0] : tempRoutes?.[1];
        return currentParent === tempParent;
    };


    if (!avatar || !user) {
        return <NavbarSkeleton />
    }

    

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/80 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">Y</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                                    YūConnect
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Search */}
                        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                            <SearchDropdown />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-2">
                            {navItems.map((item) => (
                                <NavLink key={item.name} item={item} isActive={isActive} />
                            ))}


                            {/* User Menu */}
                            <div className="relative ml-4">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <UserAvatar
                                        user={user.user}
                                        avatar={avatar}
                                        size='headonly'
                                        direction='down-left'
                                        head_direction='down-left'
                                        action='idle'
                                        gesture='normal'
                                        item={null}
                                    />
                                    <div className="hidden xl:block text-left">
                                        <p className="text-sm font-medium text-gray-900">{user.user.full_name}</p>
                                        <p className="text-xs text-gray-500">@{user.user.username}</p>
                                    </div>
                                </button>

                                {/* User Dropdown */}
                                {showUserMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowUserMenu(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-20">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    {/* <UserAvatar size="lg" /> */}
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{user.user.full_name}</p>
                                                        <p className="text-sm text-gray-500">@{user.user.username}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-2">
                                                <Link
                                                    href={`/profile/1`}
                                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Your Profile
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Settings
                                                </Link>
                                                <Link
                                                    href="/help"
                                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Help & Support
                                                </Link>
                                            </div>

                                            <div className="border-t border-gray-100 py-2">
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setShowUserMenu(false);
                                                    }}
                                                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex items-center space-x-2 md:hidden">
                            {/* Mobile Search Button */}
                            <button
                                onClick={() => setShowMobileSearch(true)}
                                className="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            >
                                <MagnifyingGlassIcon className="h-6 w-6" />
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setShowMobileMenu(true)}
                                className="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            >
                                <Bars3Icon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Modal */}
            {showMobileSearch && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowMobileSearch(false)}
                    />
                    {/* Content */}
                    <div className="relative bg-white h-full pt-16">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold">Search</h2>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowMobileSearch(false)}
                                    className="px-3 py-1 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    Exit
                                </button>
                                <button
                                    onClick={() => setShowMobileSearch(false)}
                                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <SearchDropdown autoFocus />
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <button
                                onClick={() => setShowMobileMenu(false)}
                                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">

                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl mb-6">
                                <UserAvatar
                                    user={user.user}
                                    avatar={avatar}
                                    size="headonly"
                                    direction="down-left"
                                    head_direction="down-left"
                                    action="idle"
                                    gesture='norma'
                                    item={null}
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">{user.user.full_name}</p>
                                    <p className="text-sm text-gray-500">@{user.user.username}</p>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div className="space-y-2 mb-6">
                                {navItems.map((item) => {
                                    const active = isActive(item.path);
                                    const Icon = active ? item.iconSolid : item.icon;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            onClick={() => setShowMobileMenu(false)}
                                            className={`flex items-center space-x-3 p-4 rounded-xl transition-colors ${active
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="relative">
                                                <Icon className="h-6 w-6" />
                                                {item.badge && item.badge > 0 && (
                                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                                        {item.badge > 9 ? '9+' : item.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Create Button */}
                            <Link
                                href="/create"
                                onClick={() => setShowMobileMenu(false)}
                                className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors mb-6"
                            >
                                <PlusIcon className="h-5 w-5" />
                                <span className="font-medium">Create Post</span>
                            </Link>

                            {/* Menu Links */}
                            <div className="space-y-2 border-t border-gray-200 pt-6">
                                <Link
                                    href={`/profile/1`}
                                    onClick={() => setShowMobileMenu(false)}
                                    className="block p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    href="/settings"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="block p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Settings
                                </Link>
                                <Link
                                    href="/help"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="block p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Help & Support
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setShowMobileMenu(false);
                                    }}
                                    className="block w-full text-left p-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

export default Navbar;