'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Avatar } from '@/app/models/AvatarSchema';
import { useAvatarAssets } from '@/app/providers/avatarAssets';
import { dummyUsers } from '@/app/data/dummy/users';
import { myUser } from '../data/dummy/myUser';
import { generateAvatarMetadata } from '@/app/data/dummy/avatars';
import { toast } from 'sonner';
import { AvatarMetadata, Comments, Friend, Friends, Likes, Posts, User, UserData, Users, UsersData } from '@/app/lib/definitions';
import { generateFriends } from '../data/dummy/friends';
import { generateSocials } from '../data/dummy/socials';



interface DummyState {
    users: UsersData | null;
    myUser: UserData | null;
    loading: boolean;
    posts: Posts | null;
    comments: Comments | null;
    likes: Likes | null;
}
type DummyAction =
    { type: 'SET_LOADING'; payload: boolean } |
    { type: 'SET_USERS'; payload: UsersData } |
    { type: 'SET_MY_USER'; payload: UserData } |
    { type: 'SET_POSTS'; payload: Posts } |
    { type: 'SET_COMMENTS'; payload: Comments } |
    { type: 'SET_LIKES'; payload: Likes }


interface DummyContextType {
    users: UsersData | null;
    myUser: UserData | null;
    posts: Posts | null;
    comments: Comments | null;
    likes: Likes | null;
    loading: boolean;
    getUserByID: (user_id: string) => UserData | null;
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
            return { ...state, users: action.payload };
        case 'SET_MY_USER':
            return { ...state, myUser: action.payload };
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload };
        case 'SET_LIKES':
            return { ...state, likes: action.payload };

        default: return state;
    }
}

export const DummyProvider: React.FC<DummyProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(DummyReducer, {
        users: null,
        myUser: null,
        posts: null,
        comments: null,
        likes: null,
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

    useEffect(() => {
        if (state.users && !state.myUser?.friends) {
            loadMyFriends();
        }
    }, [state.users])

    useEffect(() => {
        if (state.myUser?.friends && state.users) {
            refreshFriendsGlobal();
        }
    }, [state.myUser?.friends]);

    useEffect(() => {
        const findUserByID = (id: string) => {
            if (state.users) {
                return state.users.find((user) => user.user?.id === id) ?? null;
            }
            return null;
        }
        const loadSocials = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const socialStorage = localStorage.getItem('socials');
                if (!socialStorage) {
                    const users = state.users ? [...state.users] : null;
                    const myUser = state.myUser ? { ...state.myUser } : null;
                    const posts: Posts = [];
                    const comments: Comments = [];
                    const likes: Likes = [];
                    const users_with_posts_len = users ? users.length : 0;
                    if (users) {
                        for (let i = 0; i < users_with_posts_len; i++) {
                            const user = users[Math.floor(Math.random() * users.length)];
                            if (!user || !user.user?.id || !user.friends) {
                                continue;
                            }

                            const friends = user.friends
                                .map((friend) => {
                                    if (!user.user?.id) return null;


                                    const friendId = friend.friend_id_1 !== user.user.id
                                        ? friend.friend_id_1
                                        : friend.friend_id_2;

                                    return findUserByID(friendId);
                                })
                                .filter(friend => friend !== null);
                            if (friends.length > 0) {
                                const socialObj = await generateSocials(user.user?.id, friends);
                                if (!socialObj) {
                                    continue;
                                }
                                posts.push(...socialObj.posts);
                                comments.push(...socialObj.comments);
                                likes.push(...socialObj.likes);
                            }

                        }
                    }
                    if (myUser && myUser.friends && myUser.user?.id) {
                        const friends = myUser.friends.map((friend) => {
                            if (!myUser.user?.id) return null;


                            const friendId = friend.friend_id_1 !== myUser.user.id
                                ? friend.friend_id_1
                                : friend.friend_id_2;

                            return findUserByID(friendId);
                        })
                            .filter(friend => friend !== null);
                        if (friends.length > 0) {
                            const socialObj = await generateSocials(myUser.user.id, friends);
                            if (socialObj) {
                                posts.push(...socialObj.posts);
                                comments.push(...socialObj.comments);
                                likes.push(...socialObj.likes);
                            }
                        }
                    }
                    localStorage.setItem('socials', JSON.stringify({
                        posts: posts,
                        comments: comments,
                        likes: likes
                    }));
                    if (posts.length > 0) {
                        dispatch({ type: 'SET_POSTS', payload: posts });
                    }
                    if (comments.length > 0) {
                        dispatch({ type: 'SET_COMMENTS', payload: comments });
                    }
                    if (likes.length > 0) {
                        dispatch({ type: 'SET_LIKES', payload: likes });
                    }
                } else {
                    const socials = JSON.parse(socialStorage);
                    const posts: Posts = socials?.posts ?? [];
                    const comments: Comments = socials?.comments ?? [];
                    const likes: Likes = socials?.likes ?? [];

                    if (posts.length > 0) {
                        dispatch({ type: 'SET_POSTS', payload: posts });
                    }
                    if (comments.length > 0) {
                        dispatch({ type: 'SET_COMMENTS', payload: comments });
                    }
                    if (likes.length > 0) {
                        dispatch({ type: 'SET_LIKES', payload: likes });
                    }

                }

                dispatch({ type: 'SET_LOADING', payload: false });
            } catch (error) {
                console.error('Failed to load socials in context. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        }

        if (state.users && state.myUser) {
            loadSocials();
        }
    }, [state.users, state.myUser]);


    const refreshFriendsGlobal = () => {
        if (state.myUser && state.users && state.myUser.friends) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });

                const users: UsersData = state.users.map((user) => {
                    if (state.myUser?.friends && user?.user?.id) {
                        const friendtemp: Friend | null = state.myUser?.friends.find((friend) => {
                            return friend.friend_id_1 === user?.user?.id || friend.friend_id_2 === user?.user?.id;
                        }) ?? null;
                        const friendsInsert = user.friends ? [...user.friends] : [];

                        if (friendtemp) {
                            friendsInsert.push(friendtemp);
                        }
                        return {
                            user: user.user,
                            avatarMetadata: user.avatarMetadata,
                            avatar: user.avatar,
                            friends: friendsInsert,
                        } as UserData;
                    } else {
                        throw new Error('Users data not ready yet');
                    }
                })

                dispatch({ type: 'SET_USERS', payload: users })
                dispatch({ type: 'SET_LOADING', payload: false });
            } catch (error) {
                console.error('Failed to load refresh friends. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        }
    }

    const loadUsers = () => {
        if (assets && dummyUsers) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const usersStorage = localStorage.getItem('users');
                if (!usersStorage) {
                    const friendsListRelation: Friends[] = [];
                    const users: UsersData = dummyUsers.map((user) => {
                        const avatar = new Avatar(user.gender ? user.gender : 'M');
                        avatar.defaultSet(avatar.gender, assets);
                        const metadata = generateAvatarMetadata(user.id, avatar.gender, avatar.getFigureJSON());
                        const relationsFound = friendsListRelation.find((friends) => friends.find((friend) => friend.friend_id_1 === user.id || friend.friend_id_2 === user.id)) ?? null;
                        const friendCount = Math.floor(Math.random() * 49) + 1;
                        const friends = generateFriends(user.id, dummyUsers, relationsFound, friendCount);
                        if (friends) {
                            friendsListRelation.push(friends);
                            if (relationsFound) {
                                friends.push(...relationsFound);
                            }
                        }

                        return {
                            user: user,
                            avatarMetadata: metadata,
                            avatar: avatar,
                            friends: friends ?? relationsFound
                        } as UserData;
                    })
                    const store = users.map((user) => {
                        return {
                            user: user.user,
                            avatarMetadata: user.avatarMetadata,
                            friends: user.friends
                        }
                    });
                    localStorage.setItem('users', JSON.stringify(store));
                    dispatch({ type: 'SET_USERS', payload: users });
                } else {
                    const tempusers = JSON.parse(usersStorage);
                    if (!tempusers || !Array.isArray(tempusers)) {
                        localStorage.removeItem('users');
                        return loadUsers();
                    }
                    const users: UsersData = tempusers.map((user) => {
                        const avatar = new Avatar(user?.gender);
                        let metadata: AvatarMetadata | null = user?.avatarMetadata;
                        if (!metadata?.figure) {
                            avatar.defaultSet(user?.gender, assets);
                            metadata = generateAvatarMetadata(user?.user?.id, avatar.gender, avatar.getFigureJSON());
                        } else {
                            avatar.fromJSON(metadata.figure);
                        }
                        return {
                            user: user?.user,
                            avatarMetadata: metadata,
                            avatar: avatar,
                            friends: user?.friends
                        }
                    })
                    dispatch({ type: 'SET_USERS', payload: users });
                }


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

    const loadMyFriends = () => {
        if (state.myUser && state.users && state.myUser.user?.id) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const friendsStorage = localStorage.getItem('myFriends');
                if (!friendsStorage) {
                    const users: Users = state.users.map((user) => user.user as User);
                    const myFriends = generateFriends(
                        state.myUser.user?.id,
                        users,
                        null,
                        Math.floor(Math.random() * 49) + 1);
                    localStorage.setItem('myFriends', JSON.stringify(myFriends));
                    dispatch({ type: 'SET_MY_USER', payload: { ...state.myUser, friends: myFriends } });
                } else {
                    const myFriends = JSON.parse(friendsStorage);
                    dispatch({ type: 'SET_MY_USER', payload: { ...state.myUser, friends: myFriends } });
                }

                dispatch({ type: 'SET_LOADING', payload: false });
                toast.success('Loaded dummy friend list');
            } catch (error) {
                console.error('Failed to load my dummy user friends list. Error(s): ', error);
                dispatch({ type: 'SET_LOADING', payload: false });
                toast.error('Failed to load my dummy user friends list');
            }
        }
    }
    const getUserByID = (user_id: string): UserData | null => {
        if (state.users) return state.users.find((user) => user.user?.id === user_id) ?? null;
        return null;
    }
    
    const value: DummyContextType = {
        users: state.users,
        myUser: state.myUser,
        posts: state.posts,
        comments: state.comments,
        likes: state.likes,
        loading: state.loading,
        getUserByID
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
