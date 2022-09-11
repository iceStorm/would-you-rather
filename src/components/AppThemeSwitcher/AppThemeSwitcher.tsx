import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

import moon from '../../assets/icons8-do-not-disturb-ios-48.png'
import sun from '../../assets/icons8-sun-48.png'
import laptop from '../../assets/icons8-laptop-48.png'

type ThemeMode = 'system' | 'light' | 'dark'
type ThemeModeMenuItem = {
    mode: ThemeMode
    image: string
}

const LOCAL_STORAGE_KEY_THEME_MODE = 'color-theme'
const themeModes: ThemeModeMenuItem[] = [
    {
        mode: 'light',
        image: sun,
    },
    {
        mode: 'dark',
        image: moon,
    },
    {
        mode: 'system',
        image: laptop,
    },
]

export function AppThemeSwitcher() {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        if (!(LOCAL_STORAGE_KEY_THEME_MODE in localStorage)) {
            return 'system'
        }

        const isDarkTheme = localStorage.getItem(LOCAL_STORAGE_KEY_THEME_MODE) === 'dark'
        return isDarkTheme ? 'dark' : 'light'
    })

    const onToggleClick = (mode: ThemeMode) => {
        setThemeMode(mode)

        if (mode === 'system') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
            return localStorage.removeItem(LOCAL_STORAGE_KEY_THEME_MODE)
        }

        if (mode === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        localStorage.setItem(LOCAL_STORAGE_KEY_THEME_MODE, mode)
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button
                    title="Toggle theme mode"
                    className={clsx(
                        'p-2 text-sm font-medium shadow-sm',
                        'inline-flex w-full justify-center rounded-full',
                        'border border-light-border dark:border-gray-700',
                        'bg-white dark:bg-slate-900 hover:bg-gray-50 focus:outline-none',
                    )}
                >
                    <img
                        src={themeMode === 'system' ? laptop : themeMode === 'light' ? sun : moon}
                        alt=""
                        className="w-5 dark:invert"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-md bg-white dark:bg-secondary-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-600">
                    <div className="py-1">
                        {themeModes.map((item) => (
                            <Menu.Item key={item.mode}>
                                {({ active }) => (
                                    <a
                                        onClick={(e) => onToggleClick(item.mode)}
                                        className={clsx(
                                            active
                                                ? 'bg-gray-100 dark:bg-gray-600 dark:bg-opacity-25 text-gray-900 dark:text-gray-400'
                                                : 'text-gray-700 dark:text-dark-text',
                                            'block px-4 py-2 text-sm',
                                            'flex items-center gap-3 cursor-pointer',
                                        )}
                                    >
                                        <img src={item.image} alt={item.mode} className="w-5 dark:invert" />
                                        <span>
                                            {item.mode[0].toUpperCase() + item.mode.toLocaleLowerCase().slice(1)}
                                        </span>
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
