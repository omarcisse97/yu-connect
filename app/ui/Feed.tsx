import { ReactNode } from "react";

interface FeedProps {
    children: ReactNode;
}
const Feed: React.FC<FeedProps> = ({ children }) => {
    return (
        <div className="max-w-2xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
            {children}
        </div>
    );
}
export default Feed;