import { selectAuthState } from '../../store/auth/auth.selectors'

export function ProfilePage() {
    const { currentUser } = selectAuthState()

    return (
        <>
            {currentUser && (
                <div className="container max-w-lg mt-10">
                    <img
                        src={currentUser.avatarURL}
                        alt=""
                        className="mx-auto w-36 h-36 rounded-full border dark:border-dark-border"
                    />
                </div>
            )}
        </>
    )
}
