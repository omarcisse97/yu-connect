'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AvatarAssets } from '../models/AvatarAssetsSchema';
import { FigureDataXML } from '../lib/definitions-avatar';


interface AvatarAssetsState {
    assets: AvatarAssets | null;
    loading: boolean;
}

type AvatarAssetsAction = { type: 'SET_LOADING'; payload: boolean } |
{ type: 'SET_ASSETS'; payload: AvatarAssets } |
{ type: 'RESET' };

interface AvatarAssetsContextType {
    assets: AvatarAssets | null;
    loading: boolean;
}

const AvatarAssetsContext = createContext<AvatarAssetsContextType | undefined>(undefined);

const AvatarAssetsReducer = (state: AvatarAssetsState, action: AvatarAssetsAction) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ASSETS':
            return { ...state, assets: action.payload };
        case 'RESET':
            return { assets: null, loading: false };
        default: return state;
    }
}
interface AvatarAssetsProviderProps {
    children: ReactNode;
    assetsXML?: { sets: FigureDataXML } | null;
}
export const AvatarAssetsProvider: React.FC<AvatarAssetsProviderProps> = ({ children, assetsXML }) => {
    const [state, dispatch] = useReducer(AvatarAssetsReducer, {
        assets: null,
        loading: false
    });

    useEffect(() => {
        if (assetsXML && !state.assets) {
            LoadAssets();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetsXML]);

    const LoadAssets = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            if (!assetsXML) {
                throw new Error('Assets XML is null');
            }
            const avatarAssets = new AvatarAssets();
            avatarAssets.loadFromFigureData(assetsXML.sets as FigureDataXML);
            dispatch({ type: 'SET_ASSETS', payload: avatarAssets });
            dispatch({ type: 'SET_LOADING', payload: false });
        } catch (error) {
            console.error('Failed to load avatar assets. Error(s): ', error);
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    const value: AvatarAssetsContextType = {
        assets: state.assets,
        loading: state.loading,
    };
    return (
        <AvatarAssetsContext.Provider value={value}>
            {children}
        </AvatarAssetsContext.Provider>
    );
}
export const useAvatarAssets = () => {
    const context = useContext(AvatarAssetsContext);
    if (!context) {
        throw new Error('Avatar Assets  must be used within the provider');
    }
    return context;
};

