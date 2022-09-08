import clsx from 'clsx'
import React, { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppHeaderProfile } from '../AppHeaderProfile'

import { AppLogo } from '../AppLogo'
import newsFeedIcon from '../../assets/icons8-feedly-48.png'
import askIcon from '../../assets/icons8-help-48.png'
import prizeIcon from '../../assets/icons8-star-half-empty-48.png'
import { selectCurrentUser } from '../../store/auth/auth.selectors'

type HeaderMenuItem = {
    title: string
    description: string
    href: string
    icon: any
    titleColor: string
}

export function AppHeader(props: React.HTMLAttributes<HTMLDivElement>) {
    const location = useLocation()
    const currentUser = selectCurrentUser()

    const headerMenuItems: HeaderMenuItem[] = useMemo(
        () => [
            {
                title: 'News Feed',
                href: '/',
                icon: newsFeedIcon,
                description: 'View community questions',
                titleColor: 'text-green-700',
            },
            {
                title: 'Create Question',
                href: '/questions/add',
                icon: askIcon,
                description: 'Submit a new question',
                titleColor: 'text-blue-700',
            },
            {
                title: 'Leader Board',
                href: '/leaderboard',
                icon: prizeIcon,
                description: 'View who is leading the rank',
                titleColor: 'text-yellow-800',
            },
        ],
        [],
    )

    return (
        <header {...props} className={clsx('app-header', props.className)}>
            <div className="container py-3 flex items-center justify-between">
                {/* logo */}
                <div className="flex-1">
                    <a href="/" className="inline-flex items-center gap-2" title="Home">
                        <AppLogo width={40} className="drop-shadow-lg" />
                        <span className="font-bold text-xl">{process.env.REACT_APP_NAME}</span>
                    </a>
                </div>

                {/* navigation */}
                {currentUser && (
                    <nav className="" style={{ flex: '2' }}>
                        <ul className="flex items-center justify-center gap-6">
                            {headerMenuItems.map((item) => {
                                return (
                                    <li key={item.href}>
                                        <Link
                                            to={item.href}
                                            title={item.description}
                                            className={clsx(
                                                'inline-flex items-center gap-2 rounded-full py-1 pl-1.5 pr-3 border border-gray-200',
                                                'hover:bg-gray-50',
                                                { grayscale: location.pathname !== item.href },
                                                {
                                                    'bg-gray-100 border-gray-300 shadow-xl':
                                                        location.pathname === item.href,
                                                },
                                            )}
                                        >
                                            <img src={item.icon} alt={item.title} width={25} />
                                            <span className={clsx('font-medium whitespace-nowrap', item.titleColor)}>
                                                {item.title}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                )}

                {/* profile dropdown */}
                <div className="flex-1 flex justify-end">
                    <AppHeaderProfile />
                </div>
            </div>
        </header>
    )
}
