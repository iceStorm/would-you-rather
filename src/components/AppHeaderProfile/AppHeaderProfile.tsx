import { selectCurrentUser } from '../../store/auth/auth.selectors'

export function AppHeaderProfile() {
    const currentUser = selectCurrentUser()

    return (
        <button>
            {currentUser && (
                <a className="rounded-full px-3 py-1.5 border border-gray-200 shadow">
                    <span className="font-medium">Hello, {currentUser.name}</span>
                </a>
            )}
        </button>
    )
}
