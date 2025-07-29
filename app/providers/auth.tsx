'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AvatarMetadata, Friends, Friend } from '@/app/lib/definitions';
import { useDummy } from './dummy';
import { toast } from 'sonner';

type UserAuth = {
    user: User,
    avatarMetadata: AvatarMetadata,
    friends: Friends | null
}

interface AuthState {
    user: UserAuth | null;
    loading: boolean;
}
type AuthAction =
    { type: 'SET_LOADING'; payload: boolean } |
    { type: 'SET_USER'; payload: UserAuth | null }

interface AuthContextType {
    user: UserAuth | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
    updateFriend: (friendObj: Friend, set: 'active' | 'request' | 'remove' | 'blocked') => void;
}
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        default: return state;
    }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        loading: false
    });

    const { myUser } = useDummy();

    useEffect(() => {
        if (!state.user) {
            initUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (myUser?.friends && state.user) {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_USER', payload: { ...state.user, friends: myUser?.friends } });
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [myUser?.friends])



    const initUser = () => {
        const storage = localStorage.getItem('user');
        const tempUser = storage ? JSON.parse(storage) : null;
        if (tempUser) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const user = tempUser as UserAuth;
                dispatch({ type: 'SET_USER', payload: user });
                dispatch({ type: 'SET_LOADING', payload: false });
            } catch (error) {
                console.error('Failed to init user. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        }
    }
    const login = (/**dummy */) => {
        if (myUser) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const user = myUser;
                localStorage.setItem('user', JSON.stringify({ user: user.user, avatarMetadata: user.avatarMetadata, friends: user.friends }));
                dispatch({ type: 'SET_USER', payload: { user: user.user, avatarMetadata: user.avatarMetadata, friends: user.friends } as UserAuth });
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.success('Successfully logged in');
            } catch (error) {
                console.error('Failed to log in user. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.error('Failed to log in');
            }
        }

    }
    const logout = () => {
        const storage = localStorage.getItem('user');
        if (storage || state.user) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                localStorage.removeItem('user');
                dispatch({ type: 'SET_USER', payload: null });
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.success('Successfully signed out');
            } catch (error) {
                console.error('Failed to log out user. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.error('Failed to sign out');
            }
        }
    }
    const updateFriend = (friendObj: Friend, set: 'active' | 'request' | 'remove' | 'blocked' = 'request') => {
        if (state.user) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const tempUser = { ...state.user };
                if (!tempUser.friends && set !== 'request') {
                    throw new Error(`Cannot perform operation "${set}" if friends object is null`);
                }
                if (!tempUser.friends) {
                    tempUser.friends = [] as Friends;
                }

                const friend = tempUser.friends.find((friend) => friend.id === friendObj.id) ?? null;

                if (set === 'request') {
                    friendObj.status = 'request';
                    if (friend) {
                        throw new Error('Cannot request a friend if relation already exists');
                    }
                    tempUser.friends.push(friendObj);
                } else {
                    if (!friend) {
                        throw new Error(`Failed to find friend relation at id "${friendObj.id}". `);
                    }
                    friend.status = set;
                }
                dispatch({ type: 'SET_USER', payload: tempUser });
                localStorage.setItem('user', JSON.stringify({ user: tempUser.user, avatarMetadata: tempUser.avatarMetadata, friends: tempUser.friends }));
                dispatch({ type: 'SET_LOADING', payload: false });
                switch (set) {
                    case 'active': toast.success('Successfully added new friend'); break;
                    case 'blocked': toast.success('Blocked user successfully'); break;
                    case 'remove': toast.success('Removed friend successfully'); break;
                    case 'request': toast.success('Friend request created successfully'); break;
                    default: break;
                }
            } catch (error) {
                console.error('Failed to update friends. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
                switch (set) {
                    case 'active': toast.error('Failed to add new friend'); break;
                    case 'blocked': toast.error('Failed to block friend'); break;
                    case 'remove': toast.error('Failed to remove friend'); break;
                    case 'request': toast.error('Failed to create friend request'); break;
                    default: break;
                }
            }
        }
    }
    const value: AuthContextType = {
        user: state.user,
        loading: state.loading,
        login,
        logout,
        updateFriend
    };



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('AUTH must be used within the provider');
    }
    return context;
};
