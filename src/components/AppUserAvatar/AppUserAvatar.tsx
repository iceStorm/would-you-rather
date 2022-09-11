import React from 'react'
import defaultAvatar from '../../assets/icons8-male-user-48.png'

type AppUserAvatarParams = React.HTMLAttributes<HTMLImageElement> & {
    avatarName?: string
}

export function AppUserAvatar({ avatarName, ...nativeImageParams }: AppUserAvatarParams) {
    return <img alt="" {...nativeImageParams} src={avatarName || defaultAvatar} />
}
