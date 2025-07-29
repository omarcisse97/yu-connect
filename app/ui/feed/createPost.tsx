import { User, Comment } from "@/app/lib/definitions"
import { Avatar } from "@/app/models/AvatarSchema"
import { PhotoIcon, FaceSmileIcon, XMarkIcon, EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline"
import { useState, useRef } from "react"
import UserAvatar from "../UserAvatar"
import Image from "next/image"
import { useSocials } from "@/app/providers/socials"
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface CreatePostProps {
    user: User;
    avatar: Avatar;
}
interface CommentInputProps {
    postId: string;
    user: User;
    avatar: Avatar;
}

const handleCreatePost = (postData: { text: string; images: File[] }) => {
      console.log('create new post');
}

const handleAddComment = (post_id: string, text: string, images: File[] | null) => {
  console.log('Add new comment');
}

export const CommentInput = ({ postId, user, avatar }: CommentInputProps) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            handleAddComment(postId,comment.trim(), null);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-3">
            <UserAvatar
                user={user}
                avatar={avatar}
                size="medium"
                direction="down"
                head_direction="down"
                action="idle"
                gesture="normal"
                item={null}
            />
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
};

export const CreatePost = ({ user, avatar }: CreatePostProps) => {
    const [post, setPost] = useState('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validImages = files.filter(file => file.type.startsWith('image/'));
        
        if (validImages.length > 0) {
            // Limit to 4 images max
            const newImages = [...selectedImages, ...validImages].slice(0, 4);
            setSelectedImages(newImages);
            
            
            const newPreviews = newImages.map(file => URL.createObjectURL(file));
            setImagePreviews(newPreviews);
        }
        
        
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        
        // Revoke URL to prevent memory leaks
        URL.revokeObjectURL(imagePreviews[index]);
        
        setSelectedImages(newImages);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (post.trim() || selectedImages.length > 0) {
            handleCreatePost({
                text: post.trim(),
                images: selectedImages
            });
            
            // Reset form
            setPost('');
            setSelectedImages([]);
            // Clean up preview URLs
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
            setImagePreviews([]);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-3 sm:space-x-4">
                    <UserAvatar
                        user={user}
                        avatar={avatar}
                        size="large"
                        direction="down"
                        head_direction="down"
                        action="speack"
                        gesture="happy"
                        item={null}
                    />
                    <div className="flex-1">
                        <textarea
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            placeholder={`What's on your mind, ${user?.full_name}?`}
                            className="w-full p-3 sm:p-4 text-base sm:text-lg placeholder-gray-500 border-none resize-none focus:outline-none"
                            rows={3}
                        />
                        
                        {/* Image Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="mt-3 sm:mt-4">
                                <div className={`grid gap-2 ${
                                    imagePreviews.length === 1 ? 'grid-cols-1' :
                                    imagePreviews.length === 2 ? 'grid-cols-2' :
                                    'grid-cols-2 sm:grid-cols-3'
                                }`}>
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <div className="relative w-full h-32 sm:h-40 rounded-lg overflow-hidden">
                                                <Image
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-opacity"
                                                >
                                                    <XMarkIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {selectedImages.length}/4 images selected
                                </p>
                            </div>
                        )}

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageSelect}
                            className="hidden"
                        />

                        <div className="flex items-center justify-between mt-3 sm:mt-4">
                            <div className="flex space-x-2 sm:space-x-4">
                                <button
                                    type="button"
                                    onClick={openFileDialog}
                                    disabled={selectedImages.length >= 4}
                                    className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:bg-blue-50 px-2 sm:px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <PhotoIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="text-sm font-medium hidden sm:inline">
                                        {selectedImages.length > 0 ? `Photo (${selectedImages.length})` : 'Photo'}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:bg-blue-50 px-2 sm:px-3 py-2 rounded-lg transition-colors"
                                >
                                    <FaceSmileIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="text-sm font-medium hidden sm:inline">Emoji</span>
                                </button>
                            </div>
                            <button
                                type="submit"
                                disabled={!post.trim() && selectedImages.length === 0}
                                className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors text-sm sm:text-base"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
interface CommentCardProps {
    comment: Comment;
    user: User;
    avatar: Avatar;
    compact?: boolean;
    
}

export const CommentCard = ({ comment, user, avatar, compact = false}: CommentCardProps) => {
    const handleLike = () => {
        likePost(comment.post_id, comment.id);
    };
    const { likePost, getLikesByComments} = useSocials();
    const likes = getLikesByComments(comment.id);
    return (
        <div className={`flex space-x-3 ${compact ? 'py-2' : 'py-3'}`}>
            <UserAvatar
                user={user}
                avatar={avatar}
                size={compact ? "small" : "medium"}
                direction="down"
                head_direction="down"
                action="idle"
                gesture="normal"
                item={null}
            />
            <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-2xl px-3 py-2">
                    <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{user.full_name}</h4>
                        <span className="text-xs text-gray-500">@{user.username}</span>
                    </div>
                    <p className="text-sm text-gray-900 leading-relaxed">{comment.content}</p>
                </div>
                
                <div className="flex items-center space-x-4 mt-2 ml-3">
                    <span className="text-xs text-gray-500">{comment.updated_at}</span>
                    
                    <button
                        onClick={handleLike}
                        className={`flex items-center space-x-1 text-xs transition-colors ${
                            likes && likes > 0
                                ? 'text-red-500 hover:text-red-600'
                                : 'text-gray-500 hover:text-red-500'
                        }`}
                    >
                        {likes && likes > 0 ? (
                            <HeartIconSolid className="h-3 w-3" />
                        ) : (
                            <HeartIcon className="h-3 w-3" />
                        )}
                        {likes && likes> 0 && (
                            <span>{likes}</span>
                        )}
                    </button>

                    <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                        Reply
                    </button>
                </div>
            </div>
            
            {!compact && (
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50">
                    <EllipsisHorizontalIcon className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};