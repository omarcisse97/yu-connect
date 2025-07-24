import { useState } from 'react';
import Image from 'next/image';
import { User } from '../lib/definitions';
import { Avatar } from '../models/AvatarSchema';
import { notFound } from 'next/navigation';
import { getAvatarImagingParams } from '../lib/utils';

const imagingParam = getAvatarImagingParams();

type SIZE = keyof typeof imagingParam.sizes;
type DIRECTION = keyof typeof imagingParam.directions;
type HEAD_DIRECTION = keyof typeof imagingParam.head_directions;
type ACTION = keyof typeof imagingParam.actions;
type GESTURE = keyof typeof imagingParam.gestures;
type ITEM = keyof typeof imagingParam.hold_items | null;
type BGCOLOR = 'blue' | 'pink' | null

const UserAvatar = (
    props: {
        user: User | null, 
        avatar: Avatar | null, 
        size: SIZE,
        direction: DIRECTION,
        head_direction: HEAD_DIRECTION,
        action: ACTION,
        gesture: GESTURE,
        item: ITEM
        bgColor?: BGCOLOR
    }
) => {

  const [imageError, setImageError] = useState(false);
  const user = props.user;
  const avatar = props.avatar;
  const size = props.size;
  const direction = props.direction;
  const head_direction = props.head_direction;
  const action = props.action;
  const gesture = props.gesture;
  const item = props.item;
  const bgColor:string = props?.bgColor ?? 'bg-slate-100';


  if(!size || !direction || !head_direction || !action || !gesture){
    notFound();
  }
  const img = user && avatar? avatar.getImage(
    size,
    direction,
    head_direction,
    action,
    gesture,
    item,
    size === 'headonly'
  ) : null;
  
  const sizeClasses: Record<SIZE, string> = {
    'headonly': 'w-12 h-12',
    'small': 'w-8 h-8',
    'medium': 'w-10 h-10',
    'large': 'w-12 h-12'
  };

  const sizePixels: Record<SIZE,number> = {
    'headonly': 48,
    'small': 32,
    'medium': 40,
    'large': 48
  };


  if(!img) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${bgColor} flex items-center justify-center relative`}>
        <Image
          src={`${imagingParam.imager}?${size === 'headonly'? 'headonly=1' : `size=${imagingParam.sizes[size]}`}&gender=M&figure=`}
          alt={`UnKnown Avatar`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes={`${sizePixels[size]}px`}
          priority={size === 'large' || size === 'headonly'} 
        />
      </div>
    );
  }
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${bgColor} flex items-center justify-center relative`}>
      {img && user &&  !imageError ? (
        <Image
          src={img}
          alt={`User ${user.username} avatar`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes={`${sizePixels[size]}px`}
          priority={size === 'large' || size === 'headonly'} 
        />
      ) : (
        <span className="text-white font-semibold text-sm">
          {user?.username?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};
export default UserAvatar;