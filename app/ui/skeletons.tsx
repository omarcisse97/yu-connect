import React from 'react';

const NavbarSkeleton = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/80 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Skeleton */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
            </div>
          </div>

          {/* Desktop Search Skeleton */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="w-full h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>

          {/* Desktop Navigation Skeleton */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Nav Items (Home, Friends, Messages, Notifications) */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                {/* Badge skeleton for some items */}
                {(index === 2 || index === 3) && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}

            {/* Create Button Skeleton */}
            <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-xl ml-4 animate-pulse">
              <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-300 rounded animate-pulse hidden lg:block"></div>
            </div>

            {/* User Menu Skeleton */}
            <div className="relative ml-4">
              <div className="flex items-center space-x-3 p-2 rounded-xl">
                {/* Avatar skeleton */}
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                {/* User info skeleton */}
                <div className="hidden xl:block space-y-1">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Controls Skeleton */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Search Button */}
            <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
            {/* Mobile Menu Button */}
            <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export const PostCardSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
            {/* Post Header Skeleton */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-3">
                    {/* Avatar Skeleton */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
                    <div>
                        <div className="flex items-center space-x-1">
                            {/* Name Skeleton */}
                            <div className="h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
                        </div>
                        {/* Username and time Skeleton */}
                        <div className="h-3 bg-gray-200 rounded w-32 sm:w-40 mt-1"></div>
                    </div>
                </div>
                {/* Menu button skeleton */}
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>

            {/* Post Content Skeleton */}
            <div className="mb-3 sm:mb-4">
                {/* Text content skeleton - multiple lines */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                </div>
                
                {/* Image skeleton (optional - you can show/hide this randomly) */}
                <div className="mt-3 sm:mt-4 rounded-xl overflow-hidden">
                    <div className="w-full h-48 sm:h-64 bg-gray-200"></div>
                </div>
            </div>

            {/* Post Actions Skeleton */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                {/* Like button skeleton */}
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                    <div className="w-6 h-3 bg-gray-200 rounded"></div>
                </div>

                {/* Comment button skeleton */}
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                    <div className="w-6 h-3 bg-gray-200 rounded"></div>
                </div>

                {/* Share button skeleton */}
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

// Optional: Skeleton with random variations
export const PostCardSkeletonWithVariations = () => {
    // Randomly show/hide image skeleton
    const hasImage = Math.random() > 0.5;
    // Random text length
    const textLines = Math.floor(Math.random() * 3) + 1;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
            {/* Post Header Skeleton */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-32 sm:w-40 mt-1"></div>
                    </div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>

            {/* Post Content Skeleton with variations */}
            <div className="mb-3 sm:mb-4">
                <div className="space-y-2">
                    {Array.from({ length: textLines }).map((_, index) => (
                        <div 
                            key={index}
                            className={`h-4 bg-gray-200 rounded ${
                                index === textLines - 1 ? 'w-3/5' : 'w-full'
                            }`}
                        ></div>
                    ))}
                </div>
                
                {/* Conditionally show image skeleton */}
                {hasImage && (
                    <div className="mt-3 sm:mt-4 rounded-xl overflow-hidden">
                        <div className="w-full h-48 sm:h-64 bg-gray-200"></div>
                    </div>
                )}
            </div>

            {/* Post Actions Skeleton */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                    <div className="w-6 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                    <div className="w-6 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};


export const PostCardSkeletonList = ({ count = 3 }: { count?: number }) => {
    return (
        <div className="space-y-4 sm:space-y-6">
            {Array.from({ length: count }).map((_, index) => (
                <PostCardSkeletonWithVariations key={index} />
            ))}
        </div>
    );
};


export default NavbarSkeleton;