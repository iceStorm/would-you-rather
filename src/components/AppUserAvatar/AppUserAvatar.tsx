import React from 'react'
import defaultAvatar from '../../assets/icons8-male-user-96.png'

type AppUserAvatarParams = React.HTMLAttributes<HTMLImageElement> & {
    avatarName?: string
}

export function AppUserAvatar({ avatarName, ...nativeImageParams }: AppUserAvatarParams) {
    return <img alt="" {...nativeImageParams} src={`${process.env.PUBLIC_URL}/avatar-gallery/${avatarName}` || defaultAvatar} />
}
