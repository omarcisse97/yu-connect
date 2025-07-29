import { Post, User } from "@/app/lib/definitions"
import UserAvatar from "../UserAvatar"
import { EllipsisHorizontalIcon, HeartIcon, ChatBubbleOvalLeftIcon, ArrowPathRoundedSquareIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@/app/models/AvatarSchema";
import Image from "next/image";
import { useSocials } from "@/app/providers/socials";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { CommentInput, CommentCard } from "./createPost";
import { useState } from "react";

const PostCard = (props: { user: User, avatar: Avatar, post: Post }) => {
    const post = props.post;
    const user = props.user;
    const avatar = props.avatar;
    const { likePost, getCommentsByPostID, getLikesByPostID } = useSocials();
    const [showComments, setShowComments] = useState(false);
    const comments = getCommentsByPostID(post.id);
    
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-3">
                    {/* <AvatarDisplay _avatar={post.author.avatar} size="large" /> */}
                    <UserAvatar
                        user={user}
                        avatar={avatar}
                        size="large"
                        direction="down"
                        head_direction="down"
                        action="idle"
                        gesture="normal"
                        item={null}
                    />
                    <div>
                        <div className="flex items-center space-x-1">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{user.full_name}</h3>
                            {/* {post.author.verified && (
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )} */}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">@{user.username} · {post.updated_at}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1 sm:p-2 hover:bg-gray-50 rounded-full">
                    <EllipsisHorizontalIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
            </div>

            {/* Post Content */}
            <div className="mb-3 sm:mb-4">
                <p className="text-gray-900 leading-relaxed text-sm sm:text-base">{post.content}</p>
                {post.media_urls && post.media_urls.length > 0 && (
                    <div className="mt-3 sm:mt-4 rounded-xl overflow-hidden">
                        {post.media_type === 'image' &&
                            post.media_urls.map((image, index) => (
                                <div className="relative w-full h-48 sm:h-64" key={index}>
                                    <Image
                                        src={image}
                                        alt="Post image"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))

                        }

                    </div>
                )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                <button
                    onClick={() => { likePost(post.id, null) }}
                    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all ${post.like_count && post.like_count > 0
                        ? 'text-red-500 bg-red-50 hover:bg-red-100'
                        : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                        }`}
                >
                    {post.like_count && post.like_count > 0 ? (
                        <HeartIconSolid className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                        <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                    <span className="text-xs sm:text-sm font-medium">{post.like_count}</span>
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all ${showComments
                            ? 'text-blue-500 bg-blue-50 hover:bg-blue-100'
                            : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                        }`}
                >
                    <ChatBubbleOvalLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">{post.comments_count || 0}</span>
                </button>

                {/* <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-gray-500 hover:text-green-500 hover:bg-green-50 transition-all">
                    <ArrowPathRoundedSquareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">{post.reposts}</span>
                </button> */}

                <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all">
                    <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
            </div>
             {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    {/* Comment Input */}
                    <div className="mb-4">
                        <CommentInput 
                            postId={post.id} 
                            user={user} 
                            avatar={avatar}
                            
                        />
                    </div>
                    
                    {/* Comments List */}
                    {comments && comments.length > 0 ? (
                        <div className="space-y-3">
                            {comments.map(comment => (
                                <CommentCard 
                                    key={comment.id} 
                                    comment={comment} 
                                    user={user} 
                                    avatar={avatar} 
                                    
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm text-center py-4">
                            No comments yet. Be the first to comment!
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
export default PostCard;