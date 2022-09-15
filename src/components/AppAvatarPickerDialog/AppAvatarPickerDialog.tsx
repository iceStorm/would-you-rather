import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import _ from 'lodash'

import { useAppDispatch } from '../../store'
import { updateAvatar } from '../../store/auth/auth.thunks'
import { useAuthErrorHandler } from '../../hooks/useAuthErrorHandler'
import { AppLoadingCircle } from '../AppLoadingCircle'
import { setCurrentUser } from '../../store/auth/auth.slice'
import { selectCurrentUser } from '../../store/auth/auth.selectors'

import galleryAvatars from '../../assets/gallery-avatars.json'
type galleryAvatarType = keyof typeof galleryAvatars

type AppAvatarPickerDialogProps = {
    isOpen: boolean
    onClosed: () => void
}

export function AppAvatarPickerDialog({ isOpen, onClosed }: AppAvatarPickerDialogProps) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const currentUser = selectCurrentUser()
    const [isSavingAvatar, setIsSavingAvatar] = useState(false)
    const [selectedAvatarName, setSelectedAvatarName] = useState<galleryAvatarType | string>('')

    function closeModal() {
        onClosed()
        setSelectedAvatarName('')
    }

    function onSaveChange() {
        setIsSavingAvatar(true)

        const avatarPath = galleryAvatars[selectedAvatarName as galleryAvatarType]
        dispatch(updateAvatar(avatarPath))
            .unwrap()
            .then(() => {
                const updatedUser = _.cloneDeep(currentUser)
                updatedUser!.avatarURL = avatarPath
                setCurrentUser(updatedUser)
                closeModal()
                navigate(0) // reload
            })
            .catch((error) => {
                console.error(error)
                useAuthErrorHandler(error)
            })
            .finally(() => {
                setIsSavingAvatar(false)
            })
    }

    const getImageModule = (name: string) => {
        // const avatarModulePath = `../../assets/avatar-gallery/${name}.png`
        return process.env.PUBLIC_URL + `/avatar-gallery/${name}.png`
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-secondary-dark p-6 text-left align-middle shadow-xl transition-all border dark:border-dark-border">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-gray-900 dark:text-gray-200"
                                    >
                                        Pick an avatar
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            You can upload an image from your computer, or choose from the fascinating
                                            images below.
                                        </p>
                                    </div>

                                    {/* body */}
                                    <div className="images-grid mt-10 mb-10 flex flex-wrap gap-5">
                                        <div
                                            className={clsx(
                                                'w-24 h-24 rounded-md bg-white dark:bg-dark p-3 shadow cursor-pointer hover:opacity-50',
                                                'border dark:border-dark-border',
                                                'flex flex-col items-center gap-3',
                                            )}
                                        >
                                            <img
                                                src="/upload.png"
                                                alt=""
                                                className={clsx('w-10 dark:invert')}
                                                onClick={(e) => {}}
                                            />
                                            <p className="text-sm text-gray-500">Upload</p>
                                        </div>

                                        {Object.entries(galleryAvatars).map(([name, base64]) => (
                                            <img
                                                key={name}
                                                src={getImageModule(name)}
                                                alt=""
                                                className={clsx(
                                                    'w-24 h-24 rounded-md bg-white dark:bg-dark p-3 shadow cursor-pointer hover:opacity-50',
                                                    'border dark:border-dark-border',
                                                    {
                                                        'ring-2 ring-primary': selectedAvatarName === name,
                                                    },
                                                )}
                                                onClick={(e) => setSelectedAvatarName(name)}
                                            />
                                        ))}
                                    </div>

                                    {/* footer */}
                                    <div className="flex justify-between items-center">
                                        <button
                                            className="app-button"
                                            onClick={onSaveChange}
                                            disabled={!selectedAvatarName || isSavingAvatar}
                                        >
                                            <AppLoadingCircle showing={isSavingAvatar} />
                                            <span>Save change</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
