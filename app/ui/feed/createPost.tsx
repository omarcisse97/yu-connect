import { User } from "@/app/lib/definitions"
import { Avatar } from "@/app/models/AvatarSchema"
import { PhotoIcon, FaceSmileIcon } from "@heroicons/react/24/outline"
import { userInfo } from "os"
import { useState } from "react"
import UserAvatar from "../UserAvatar"

export const CreatePost = (props: { handleCreatePost: () => void, user: User, avatar: Avatar }) => {
    const handleCreatePost = props.handleCreatePost;
    const user = props.user;
    const avatar = props.avatar;
    const [post, setPost] = useState('');
    return(
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <form onSubmit={handleCreatePost}>
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
              <div className="flex items-center justify-between mt-3 sm:mt-4">
                <div className="flex space-x-2 sm:space-x-4">
                  <button
                    type="button"
                    className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:bg-blue-50 px-2 sm:px-3 py-2 rounded-lg transition-colors"
                  >
                    <PhotoIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm font-medium hidden sm:inline">Photo</span>
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
                  disabled={!post.trim()}
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
}