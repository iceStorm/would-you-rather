import { selectCurrentUser } from '../../store/auth/auth.selectors'
import { Fragment } from 'react'
import clsx from 'clsx'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { logOut, setCurrentUser } from '../../store/auth/auth.slice'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { AppUserAvatar } from '../AppUserAvatar'

export function AppHeaderProfile() {
    const currentUser = selectCurrentUser()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <>
            {currentUser && (
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex items-center w-full justify-center rounded-full border border-light-border dark:border-gray-700 bg-white dark:bg-slate-900 px-4 py-1 pl-1 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none">
                            <div className="flex items-center gap-3">
                                <AppUserAvatar
                                    avatarName={currentUser.avatarURL}
                                    className="w-7 h-7 p-1 rounded-full border border-gray-200 dark:border-none"
                                />
                                <span className="font-medium dark:text-gray-200">Hello, {currentUser.name}</span>
                            </div>

                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/profile"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 dark:bg-gray-600 dark:bg-opacity-25 text-gray-900 dark:text-gray-400'
                                                    : 'text-gray-700 dark:text-dark-text',
                                                'block px-4 py-2 text-sm',
                                            )}
                                        >
                                            My Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>

                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="submit"
                                            className={clsx(
                                                active
                                                    ? 'bg-gray-100 dark:bg-gray-600 dark:bg-opacity-25 text-gray-900 dark:text-gray-400'
                                                    : 'text-gray-700 dark:text-dark-text',
                                                'block w-full px-4 py-2 text-left text-sm',
                                            )}
                                            onClick={(e) => {
                                                dispatch(logOut())
                                                navigate('/')
                                            }}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            )}
        </>
    )
}
