import { Posts, Post, Friends, UsersData, Comments, Comment, Likes, Like } from "@/app/lib/definitions";
import { videos } from "./videos";
export const generateUniqueId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 4)}`;
};

export const generateLikes = (
    post_id: string,
    comment_id: string | null,
    count: number = Math.floor(Math.random() * 100) + 1,
    friends: UsersData
): Likes => {
    const likes: Likes = []
    for (let i = 0; i < count; i++) {
        const user_id = friends[Math.floor(Math.random() * friends.length)].user?.id ?? null;
        if(user_id){
            likes.push({
            id: generateUniqueId(),
            user_id: user_id,
            post_id: post_id,
            comment_id: comment_id,
            created_at: new Date().toISOString()
        } as Like)
        }
        
    }
    return likes;
}
export const generateComments = (
    post_id: string,
    count: number = Math.floor(Math.random() * 100) + 1,
    friends: UsersData
): {
    comments: Comments,
    likes: Likes
} => {
    const contents = ["good job", "wow", "i hate this", "i love it", "Where can i get this?", "Anyone here?"];
    const comments: Comments = [];
    const likes: Likes = [];
    for (let i = 0; i < count; i++) {

        const includeLikes = Math.floor(Math.random() * 2);
        const likes_count = includeLikes === 0 ? 0 : Math.floor(Math.random() * 200) + 1;
        const is_child = comments.length > 0 ? Math.floor(Math.random() * 2) : 0;
        const parent_comment_id = is_child === 0 ? null : comments[Math.floor(Math.random() * comments.length)].id;
        const comment_user_id = friends[Math.floor(Math.random() * friends.length)].user?.id ?? null;
        if (comment_user_id) {
            comments.push({
                id: generateUniqueId(),
                post_id: post_id,
                user_id: comment_user_id,
                parent_comment_id: parent_comment_id,
                content: contents[Math.floor(Math.random() * contents.length)],
                media_url: null,
                likes_count: likes_count,
                replied_count: null,
                is_pinned: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            } as Comment)

            if (likes_count > 0) {
                    likes.push(...generateLikes(post_id, comments[comments.length - 1].id, likes_count, friends));
            }

        }

    }
    return {
        comments: comments,
        likes: likes
    };
}
export const generateImages = (size: number): string[] => {
    const images: string[] = [];
    for (let i = 0; i < size; i++) {
        images.push(`https://picsum.photos/400/300?random=${Math.random()}`);
    }
    return images;
}
const includeMedia = () => {
    const includeMedia = Math.floor(Math.random() * 2);
    const media_type_bool = includeMedia === 0 ? null : Math.floor(Math.random() * 2);
    const media_type = !media_type_bool ? null : media_type_bool === 0 ? 'img' : 'video';
    const media_count = !media_type ? 0 : media_type === 'video' ? 1 : Math.floor(Math.random() * 4) + 1;
    const media_urls: string[] | null = media_count === 0 ?
        null
        : media_type === 'video' ?
            [videos[Math.floor(Math.random() * videos.length)].videoUrl] as string[]
            : generateImages(media_count);

    return {
        media_urls: media_urls,
        media_type: media_type
    }
}
export const createPost = (user_id: string, contentsDummy: {
    userId: number,
    id: number,
    title: string,
    body: string
}[]): Post | null => {
    const randomPostIDX = Math.floor(Math.random() * contentsDummy?.length);
    const id = generateUniqueId();
    const content = contentsDummy?.[randomPostIDX]?.title as string ?? null;
    if (!content) {
        return null;
    }
    const media = includeMedia();
    const is_pinned = Math.floor(Math.random() * 2) === 1 ? true : false;
    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();
    const visibility = Math.floor(Math.random() * 3) + 1;
    const comments_enabled = Math.floor(Math.random() * 2);
    const like_count = Math.floor(Math.random() * 10);
    const comments_count = comments_enabled === 0 ? 0 : Math.floor(Math.random() * 10);

    return {
        id: id,
        user_id: user_id,
        content: content,
        media_urls: media.media_urls,
        media_type: media.media_type,
        is_pinned: is_pinned,
        is_archived: null,
        location: null,
        tags: null,
        mentions: null,
        visibility: visibility === 1 ?
            'private'
            : visibility === 2 ?
                'friends'
                : visibility === 3 ?
                    'public'
                    : 'private',
        comments_enabled: comments_enabled === 0 ? false : true,
        like_count: like_count,
        comments_count: comments_count,
        shares_count: null,
        views_count: like_count + comments_count,
        created_at: created_at,
        updated_at: updated_at
    } as Post
}
export const generateSocials = async (user_id: string, friends: UsersData): Promise<{
    posts: Posts,
    comments: Comments,
    likes: Likes
} | null> => {
    try {
        const postCount = Math.floor(Math.random() * 5) + 1;
        const contents = await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((result) => {
                if (result.ok) return result.json();
                return null;
            });
        if (!contents) {
            throw new Error('Failed to retrieve dummy posts');
        }
        const posts: Posts = [];
        const comments: Comments = [];
        const likes: Likes = [];
        for (let i = 0; i < postCount; i++) {
            const post: Post | null = createPost(user_id, contents);
            if (!post) {
                continue;
            }
            posts.push(post);
            if (post.comments_count && post.comments_count > 0) {
                const commentGen = generateComments(post.id, post.comments_count, friends);
                comments.push(...commentGen.comments);
                if (commentGen.likes) likes.push(...commentGen.likes);
            }
            if (post.like_count && post.like_count > 0) {
                const like_user_id = friends[Math.floor(Math.random() * friends.length)].user?.id ?? null;
                if (like_user_id) {
                    const likeGen = generateLikes(post.id, null, post.like_count, friends);
                    likes.push(...likeGen)
                }

            }
            

        }
        
        return {
            posts: posts,
            comments: comments,
            likes: likes
        };
    } catch (error) {
        console.error('Failed to generate socials. Error(s): ', error);
        return null;
    }
}