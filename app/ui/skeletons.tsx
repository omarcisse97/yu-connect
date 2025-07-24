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

export default NavbarSkeleton;