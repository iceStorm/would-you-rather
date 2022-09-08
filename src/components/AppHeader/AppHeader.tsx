import clsx from 'clsx'
import React from 'react'

import { AppLogo } from '../AppLogo'

export function AppHeader(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <header {...props} className={clsx('app-header', props.className)}>
            <div className="container py-3">
                {/* logo */}
                <a href="/" className="flex items-center gap-2">
                    <AppLogo width={40} className="drop-shadow-lg" />
                    <span className="font-bold text-xl">{process.env.REACT_APP_NAME}</span>
                </a>

                {/* navigation */}

                {/* profile dropdown */}
            </div>
        </header>
    )
}
