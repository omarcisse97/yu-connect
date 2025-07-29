import { useAuth } from "@/app/providers/auth";
import PostCard from "./PostCard";
import { useSocials } from "@/app/providers/socials";
import { useAvatar } from "@/app/providers/avatar";
import { PostCardSkeletonList } from "../skeletons";

const PostList = () => {
    const { user } = useAuth();
    const { avatar } = useAvatar();
    const { posts, comments, likes } = useSocials();

    if(!posts || !user || !avatar || !posts){
        return <PostCardSkeletonList />
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {posts && user && avatar && posts.map((post, index) => (
                <PostCard
                key={index}
                user={user.user}
                avatar={avatar}
                post={post}
                />
            ))}
        </div>
    )
}
export default PostList;