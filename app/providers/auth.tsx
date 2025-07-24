'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AvatarMetadata } from '@/app/lib/definitions';
import { useDummy } from './dummy';
import { toast } from 'sonner';

type UserAuth = {
    user: User,
    avatarMetadata: AvatarMetadata
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
                localStorage.setItem('user', JSON.stringify({ user: user.user, avatarMetadata: user.avatarMetadata }));
                dispatch({ type: 'SET_USER', payload: { user: user.user, avatarMetadata: user.avatarMetadata } as UserAuth });
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

    const value: AuthContextType = {
        user: state.user,
        loading: state.loading,
        login,
        logout
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
