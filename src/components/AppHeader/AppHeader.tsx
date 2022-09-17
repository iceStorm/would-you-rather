import clsx from 'clsx'
import React, { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppHeaderProfile } from '../AppHeaderProfile'

import { AppLogo } from '../AppLogo'
import { selectCurrentUser } from '../../store/auth/auth.selectors'

import newsFeedIcon from '../../assets/icons8-feedly-48.png'
import askIcon from '../../assets/icons8-chat-48.png'
import prizeIcon from '../../assets/icons8-star-half-empty-48.png'
import { AppThemeSwitcher } from '../AppThemeSwitcher'

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
                titleColor: 'text-green-700 dark:text-green-600',
            },
            {
                title: 'Create Question',
                href: '/add',
                icon: askIcon,
                description: 'Submit a new question',
                titleColor: 'text-blue-500 dark:text-blue-400',
            },
            {
                title: 'Leader Board',
                href: '/leaderboard',
                icon: prizeIcon,
                description: 'View who is leading the rank',
                titleColor: 'text-yellow-600',
            },
        ],
        [],
    )

    return (
        <header {...props} className={clsx('app-header', props.className)}>
            <div className="container py-3 pb-2.5 flex items-center justify-between">
                {/* logo */}
                <div className="flex-1 flex justify-start items-center">
                    <a href="/" className="inline-flex items-center gap-2" title="Home">
                        <AppLogo width={30} className="drop-shadow-lg" />
                        <span className="font-bold text-xl text-slate-600 drop-shadow-lg dark:text-gray-200">
                            {process.env.REACT_APP_NAME.split(' ').join('').toLowerCase()}
                        </span>
                    </a>
                </div>

                {/* navigation */}
                {currentUser && (
                    <nav className="flex justify-center items-center" style={{ flex: '2' }}>
                        <ul className="flex items-center justify-center gap-6">
                            {headerMenuItems.map((item) => {
                                return (
                                    <li key={item.href}>
                                        <Link
                                            to={item.href}
                                            title={item.description}
                                            className={clsx(
                                                'inline-flex items-center gap-2 rounded-full py-1 pl-2 pr-3',
                                                'border border-light-border dark:border-dark-border',
                                                'hover:bg-gray-50 dark:hover:bg-slate-900',
                                                { grayscale: location.pathname !== item.href },
                                                {
                                                    'bg-gray-100 dark:bg-slate-900 border-light-border dark:border-gray-700 shadow-xl':
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
                <div className="flex-1 flex justify-end items-center gap-3">
                    <AppThemeSwitcher />
                    <AppHeaderProfile />
                </div>
            </div>
        </header>
    )
}
