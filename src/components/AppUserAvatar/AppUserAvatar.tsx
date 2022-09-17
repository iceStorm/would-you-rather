import clsx from 'clsx'
import React from 'react'
import defaultAvatar from '../../assets/icons8-male-user-96.png'

type AppUserAvatarParams = React.HTMLAttributes<HTMLImageElement> & {
    avatarName?: string
}

export function AppUserAvatar({ avatarName, className, ...nativeImageParams }: AppUserAvatarParams) {
    const getAvatarSource = (avatarName?: string) => {
        return avatarName?.startsWith('data:image')
            ? avatarName
            : avatarName
            ? `${process.env.PUBLIC_URL}/avatar-gallery/${avatarName}`
            : defaultAvatar
    }

    return (
        <img
            alt=""
            {...nativeImageParams}
            src={getAvatarSource(avatarName)}
            className={clsx(className, 'rounded-full object-cover')}
        />
    )
}
