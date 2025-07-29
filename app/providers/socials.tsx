'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Comments, Friend, Friends, Likes, Post, Posts, User, UserData, Users, UsersData } from '@/app/lib/definitions';
import { useDummy } from './dummy';
import { useAuth } from './auth';

interface SocialsState {
    loading: boolean;
    posts: Posts | null;
    myPosts: Posts | null;
    comments: Comments | null;
    myComments: Comments | null;
    likes: Likes | null;
    myLikes: Likes | null;
}
type SocialsAction =
    { type: 'SET_LOADING'; payload: boolean } |
    { type: 'SET_POSTS'; payload: Posts } |
    { type: 'SET_MY_POSTS'; payload: Posts } |
    { type: 'SET_COMMENTS'; payload: Comments } |
    { type: 'SET_MY_COMMENTS'; payload: Comments } |
    { type: 'SET_LIKES'; payload: Likes } |
    { type: 'SET_MY_LIKES'; payload: Likes }


interface SocialsContextType {
    posts: Posts | null;
    myPosts: Posts | null;
    comments: Comments | null;
    myComments: Comments | null;
    likes: Likes | null;
    myLikes: Likes | null;
    loading: boolean;
    addPost: (post: string) => void;
    likePost: (post_id: string, comment_id: string | null) => void;
    getCommentsByPostID: (post_id: string) => Comments | null;
    getLikesByPostID: (post_id: string) => Likes | null;
    getLikesByComments: (comment_id: string) => number;
}
interface SocialsProviderProps {
    children: ReactNode;
}
const SocialsContext = createContext<SocialsContextType | undefined>(undefined);

const SocialsReducer = (state: SocialsState, action: SocialsAction) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'SET_MY_POSTS':
            return { ...state, myPosts: action.payload };
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload };
        case 'SET_MY_COMMENTS':
            return { ...state, myComments: action.payload };
        case 'SET_LIKES':
            return { ...state, likes: action.payload };
        case 'SET_MY_LIKES':
            return { ...state, myLikes: action.payload };

        default: return state;
    }
}
export const SocialsProvider: React.FC<SocialsProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(SocialsReducer, {
        posts: null,
        myPosts: null,
        comments: null,
        myComments: null,
        likes: null,
        myLikes: null,
        loading: false
    });
    const { user } = useAuth();
    const { posts, comments, likes } = useDummy();

    useEffect(() => {

        const initSocials = () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });

                if (user && posts) {
                    const _posts = posts.filter((post) => {
                        if (post.visibility === 'private' && post.user_id !== user.user.id) {
                            return false;
                        }
                        const checkUserPost = post.user_id === user.user.id;
                        const checkFriendPost = !user.friends ? false : user.friends.find(
                            (friend) => friend.friend_id_1 === post.user_id ||
                                friend.friend_id_2 === post.user_id
                        ) ?? null !== null ? true : false;

                        const checkVisibility = post.visibility === 'public';
                        return checkUserPost || checkFriendPost || checkVisibility ? true : false;
                    });
                    dispatch({ type: 'SET_POSTS', payload: _posts });
                    if (comments) {
                        dispatch({
                            type: 'SET_COMMENTS',
                            payload: comments.filter(
                                (comment) =>
                                    _posts.find(
                                        (post) =>
                                            post.id === comment.post_id
                                    ) ?? null !== null)
                        })
                    }
                    if (likes) {
                        dispatch({
                            type: 'SET_LIKES',
                            payload: likes.filter(
                                (like) =>
                                    _posts.find(
                                        (post) =>
                                            post.id === like.post_id
                                    ) ?? null !== null)
                        })
                    }

                }
                dispatch({ type: 'SET_LOADING', payload: false });

            } catch (error) {
                console.error('Failed to initialize socials. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }

        }
        if (user && posts) {
            initSocials();
        }
    }, [user, posts, comments, likes]);

    useEffect(() => {
        const updateMySocials = () => {
            if (user && (state.posts || state.comments || state.likes)) {
                try {
                    dispatch({ type: 'SET_LOADING', payload: true });
                    if (state.posts) {
                        const myPosts = state.posts.filter((post) => post.user_id === user.user.id);
                        if (myPosts.length > 0) dispatch({ type: 'SET_MY_POSTS', payload: myPosts });
                    }
                    if (state.comments) {
                        const myComments = state.comments.filter((comment) => comment.user_id === user.user.id);
                        if (myComments.length > 0) dispatch({ type: 'SET_MY_COMMENTS', payload: myComments });
                    }
                    if (state.likes) {
                        const myLikes = state.likes.filter((like) => like.user_id === user.user.id);
                        if (myLikes.length > 0) dispatch({ type: 'SET_MY_LIKES', payload: myLikes });
                    }

                    dispatch({ type: 'SET_LOADING', payload: false });
                } catch (error) {
                    console.error('Failed to load my user socials. Error(s): ', error);
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            }
        }
        if(user && (state.posts || state.comments || state.likes)){
            updateMySocials();
        }
    }, [user, state.posts, state.comments, state.likes]);

    const addPost = (post: string) => {
        try{
            dispatch({ type: 'SET_LOADING', payload: true });
            console.log('Create post method');
            dispatch({ type: 'SET_LOADING', payload: false });
        } catch(error){
            console.error('Failed add post in context. Error(s): ', error);
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    const likePost = (post_id: string, comment_id: string | null) => {
        try{
            dispatch({ type: 'SET_LOADING', payload: true });
            console.log('Like post method');
            dispatch({ type: 'SET_LOADING', payload: false });
        } catch(error){
            console.error('Failed like post in context. Error(s): ', error);
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }
    const getCommentsByPostID = (post_id: string) => {
        if(state.comments && state.posts) return state.comments.filter((comment) => comment.post_id === post_id);
        return null;
        
    }
    const getLikesByPostID = (post_id: string) => {
        if(state.likes && state.posts) return state.likes.filter((like) => like.post_id === post_id);
        return null;
        
    }
    const getLikesByComments = (comment_id: string) => {
        if(state.likes) return state.likes.filter((like) => like.comment_id === comment_id).length;
        return 0;
    }
    

    const value: SocialsContextType = {
        posts: state.posts,
        myPosts: state.myPosts,
        comments: state.comments,
        myComments: state.myComments,
        likes: state.likes,
        myLikes: state.myLikes,
        loading: state.loading,
        
        addPost,
        likePost,
        getCommentsByPostID,
        getLikesByPostID,
        getLikesByComments
    };
    return (
        <SocialsContext.Provider value={value}>
            {children}
        </SocialsContext.Provider>
    );
}
export const useSocials = () => {
    const context = useContext(SocialsContext);
    if (!context) {
        throw new Error('useSocials  must be used within the provider');
    }
    return context;
};

