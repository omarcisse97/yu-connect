'use client'

import { JSX, useCallback, useEffect, useState } from "react";
import { useAuth } from "./providers/auth";
import { useAvatar } from "./providers/avatar";
import { Login, Register } from "./ui/Auth";
import Feed from "./ui/Feed";
import { CreatePost } from "./ui/feed/createPost";

export default function Home() {
  const { user, loading } = useAuth();
  const { avatar } = useAvatar();
  const [authContent, setAuthContent] = useState<JSX.Element | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null)

  const navigateAuth = useCallback((authType: string) => {
    switch (authType) {
      case 'LOGIN': setAuthContent(<Login navigate={navigateAuth} />); break;
      case 'REGISTER': setAuthContent(<Register navigate={navigateAuth} />); break;
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigateAuth('LOGIN');
      } else {
        setAuthContent(null);
      }
    }
  }, [user, loading]);

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  if (!user && authContent) {
    return authContent;
  }

  if (user) {
    return (
      <Feed>
        {/* <CreatePost /> */}
        <></>
      </Feed>
    );
  }
  return <></>;

}