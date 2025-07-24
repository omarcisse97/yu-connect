'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Avatar } from '../models/AvatarSchema';
import { useAvatarAssets } from './avatarAssets';
import { useAuth } from './auth';
import { toast } from 'sonner';


interface AvatarState {
    avatar: Avatar | null;
    loading: boolean;
}
type AvatarAction =
    { type: 'SET_LOADING'; payload: boolean } |
    { type: 'SET_AVATAR'; payload: Avatar }
interface AvatarContextType {
    avatar: Avatar | null;
    loading: boolean;
}
interface AvatarProviderProps {
    children: ReactNode;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

const AvatarReducer = (state: AvatarState, action: AvatarAction) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_AVATAR':
            return { ...state, avatar: action.payload };
        default: return state;
    }
}

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(AvatarReducer, {
        avatar: null,
        loading: false
    });

    const { assets } = useAvatarAssets();
    const { user } = useAuth();

    useEffect(() => {
        if (assets && !state.avatar && user) {
            loadAvatar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const loadAvatar = async () => {
        if (assets && user) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                if(!user?.avatarMetadata){
                    throw new Error('User does not have avatar metadata');
                }

                const avatar = new Avatar(user.avatarMetadata.gender);
                avatar.fromJSON(user.avatarMetadata.figure);
                // avatar.defaultSet('M', assets);
                dispatch({ type: 'SET_AVATAR', payload: avatar });
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.success('Successfully loaded avatar');
            } catch (error) {
                console.error('Failed to load avatar. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.error('Failed to load avatar');

            }
        }

    }


    const value: AvatarContextType = {
        avatar: state.avatar,
        loading: state.loading,
    };

    return (
        <AvatarContext.Provider value={value}>
            {children}
        </AvatarContext.Provider>
    );
}
export const useAvatar = () => {
    const context = useContext(AvatarContext);
    if (!context) {
        throw new Error('Avatar must be used within the provider');
    }
    return context;
};



