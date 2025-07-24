'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Avatar } from '@/app/models/AvatarSchema';
import { useAvatarAssets } from '@/app/providers/avatarAssets';
import { dummyUsers } from '@/app/data/dummy/users';
import { myUser } from '../data/dummy/myUser';
import { generateAvatarMetadata } from '@/app/data/dummy/avatars';
import { toast } from 'sonner';
import { UserData, UsersData } from '@/app/lib/definitions';



interface DummyState {
    users: UsersData | null;
    myUser: UserData | null;
    loading: boolean;
}
type DummyAction =
    { type: 'SET_LOADING'; payload: boolean } |
    { type: 'SET_USERS'; payload: UsersData } |
    { type: 'SET_MY_USER'; payload: UserData }

interface DummyContextType {
    users: UsersData | null;
    myUser: UserData | null;
    loading: boolean;
}
interface DummyProviderProps {
    children: ReactNode;
}
const DummyContext = createContext<DummyContextType | undefined>(undefined);

const DummyReducer = (state: DummyState, action: DummyAction) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_USERS':
            return { ...state, users: action.payload, loading: false };
        case 'SET_MY_USER':
            return { ...state, myUser: action.payload };

        default: return state;
    }
}

export const DummyProvider: React.FC<DummyProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(DummyReducer, {
        users: null,
        myUser: null,
        loading: false
    });

    const { assets } = useAvatarAssets();



    useEffect(() => {
        if (!state.users && dummyUsers && assets) {
            loadUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.users, dummyUsers, assets]);

    useEffect(() => {
        if (!state.myUser && myUser && assets) {
            loadMyUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.myUser, myUser, assets])

    const loadUsers = () => {
        if (assets && dummyUsers) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const users: UsersData = dummyUsers.map((user) => {
                    const avatar = new Avatar(user.gender ? user.gender : 'M');
                    avatar.defaultSet(avatar.gender, assets);
                    const metadata = generateAvatarMetadata(user.id, avatar.gender, avatar.getFigureJSON());
                    return {
                        user: user,
                        avatarMetadata: metadata,
                        avatar: avatar
                    } as UserData;
                })
                dispatch({ type: 'SET_USERS', payload: users });
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.success('Successfully generated dummy users!');
            } catch (error) {
                console.error('Failed to load dummy users. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.error('Failed to load dummy users');
            }
        }
    }
    const loadMyUser = () => {
        if (assets && myUser) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const avatar = new Avatar(myUser.gender ? myUser.gender : 'M');
                avatar.defaultSet(avatar.gender, assets);
                const metadata = generateAvatarMetadata(myUser.id, avatar.gender, avatar.getFigureJSON());

                dispatch({
                    type: 'SET_MY_USER', payload: {
                        user: myUser,
                        avatarMetadata: metadata,
                        avatar: avatar
                    } as UserData
                });

                dispatch({ type: 'SET_LOADING', payload: false });
                toast.success('Successfully loaded my dummy user!');
            } catch (error) {
                console.error('Failed to load my dummy user. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.error('Failed to load my dummy user');
            }
        }
    }

    const value: DummyContextType = {
        users: state.users,
        myUser: state.myUser,
        loading: state.loading,
    };
    return (
        <DummyContext.Provider value={value}>
            {children}
        </DummyContext.Provider>
    );
}

export const useDummy = () => {
    const context = useContext(DummyContext);
    if (!context) {
        throw new Error('useDummy  must be used within the provider');
    }
    return context;
};
