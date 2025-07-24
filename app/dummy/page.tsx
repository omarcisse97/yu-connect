'use client'

import { useAvatar } from "../providers/avatar";
import { useAuth } from "../providers/auth";
import Image from "next/image";
const Page = () => {
    const { avatar } = useAvatar();
    const { user } = useAuth();

    const img = avatar?.getImage('large', 'down-right', 'down-right', 'idle', 'normal', null, false);
    console.log('URL -> ', img);

    return (
        <div>
            {img &&
                <Image
                    src={img}
                    alt="myHabbo"
                    width={64}   // Large avatars are typically 64x110
                    height={110}
                />
            }
        </div>
    );
};
export default Page;
