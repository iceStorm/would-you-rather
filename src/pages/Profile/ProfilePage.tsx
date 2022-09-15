import { useState } from 'react'
import Tippy from '@tippyjs/react'

import { AppUserAvatar } from '../../components/AppUserAvatar'
import { selectAuthState } from '../../store/auth/auth.selectors'

import askIcon from '../../assets/icons8-get-help-96.png'
import answerIcon from '../../assets/icons8-solve-96.png'
import imageIcon from '../../assets/icons8-web-camera-96.png'
import { AppAvatarPickerDialog } from '../../components/AppAvatarPickerDialog'

export function ProfilePage() {
    const { currentUser } = selectAuthState()
    const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false)

    const handleChangeAvatarButtonClick = () => {
        setIsAvatarPickerOpen(true)
    }

    return (
        <>
            <AppAvatarPickerDialog isOpen={isAvatarPickerOpen} onClosed={() => setIsAvatarPickerOpen(false)} />

            {currentUser && (
                <div className="container max-w-lg mt-5 flex flex-col p-5 border dark:border-dark-border dark:bg-secondary-dark rounded-md">
                    <div className="relative inline mx-auto">
                        <AppUserAvatar
                            avatarName={currentUser.avatarURL}
                            className="mx-auto w-36 h-36 p-3 rounded-full bg-white dark:bg-dark border dark:border-dark-border mb-10 shadow-md"
                        />

                        {/* button change avatar */}
                        <Tippy content="Change avatar">
                            <button
                                className="absolute right-2 bottom-12 rounded-full overflow-hidden w-7 h-7"
                                onClick={handleChangeAvatarButtonClick}
                            >
                                <img src={imageIcon} alt="" className="scale-150" />
                            </button>
                        </Tippy>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <p className="p-3 border dark:border-dark-border rounded-md dark:bg-dark flex items-center gap-2 bg-white">
                                <span>{currentUser.id}</span>
                            </p>
                            <p className="p-3 border dark:border-dark-border rounded-md dark:bg-dark flex items-center gap-2 bg-white">
                                <span>{currentUser.name}</span>
                            </p>
                        </div>

                        <div className="flex gap-3 font-bold text-sm">
                            <p className="flex-1 px-3 py-1 border dark:border-dark-border rounded-md dark:bg-dark flex items-center gap-3 bg-white">
                                <img src={askIcon} alt="" className="w-7" />
                                <span>
                                    <span>{currentUser.questions.length}</span>&nbsp;&nbsp;
                                    <span>Created questions</span>
                                </span>
                            </p>
                            <p className="flex-1 px-3 py-1 border dark:border-dark-border rounded-md dark:bg-dark flex items-center gap-3 bg-white">
                                <img src={answerIcon} alt="" className="w-7" />
                                <span>
                                    <span>{Object.keys(currentUser.answers).length}</span>
                                    &nbsp;&nbsp;
                                    <span>Answered questions</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
