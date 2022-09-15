import { Spinner } from '@fluentui/react'
import clsx from 'clsx'
import _ from 'lodash'
import { useEffect, useMemo } from 'react'

import { AppUserAvatar } from '../../components/AppUserAvatar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchAllUsers } from '../../store/users/users.thunks'
import { User } from '../../models/User'

import goldBorder from '../../assets/avt-level-gold.png'
import silverBorder from '../../assets/avt-level-silver.png'
import bronzeBorder from '../../assets/avt-level-bronze.png'

export function LeaderBoardPage() {
    const dispatch = useAppDispatch()
    const { allUsers, fetchingUsers } = useAppSelector((state) => state.users)

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

    const leaderBoardUsers = useMemo(() => {
        const clonedUsers = _.cloneDeep(allUsers)

        clonedUsers.sort((a, b) => {
            const aUserScores = a.questions.length + Object.keys(a.answers).length
            const bUserScores = b.questions.length + Object.keys(b.answers).length

            return bUserScores - aUserScores
        })

        return clonedUsers
    }, [allUsers])

    return (
        <>
            <div className="container max-w-lg mt-5">
                {fetchingUsers ? (
                    <Spinner label="Fetching users..." />
                ) : (
                    <div className="flex flex-col gap-5">
                        {leaderBoardUsers.map((user, index) => {
                            return <LeaderBoardCard key={user.id} user={user} index={index} />
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

function LeaderBoardCard({ user, index }: { user: User; index: number }) {
    return (
        <div
            className={clsx(
                'p-3 px-5 border dark:border-dark-border rounded-md',
                'flex items-center gap-10 shadow',
                'bg-white dark:bg-secondary-dark',
            )}
        >
            <div className="flex-1 relative w-32 h-32 flex justify-center items-center">
                <AppUserAvatar avatarName={user.avatarURL} className="w-20 absolute max-w-full" />
                <img
                    src={index === 0 ? goldBorder : index === 1 ? silverBorder : index === 2 ? bronzeBorder : ''}
                    alt=""
                    className="absolute drop-shadow max-w-full w-32"
                />
            </div>

            <div className="flex-2 flex flex-col justify-between font-medium">
                <p className="text-lg font-bold dark:text-gray-200 mb-3 mt-1">{user.name}</p>

                <div className="flex gap-2 text-sm">
                    <div className="flex flex-col gap-2">
                        <p className="px-3 py-1 border dark:border-dark-border rounded-md bg-green-50 text-primary dark:bg-dark">
                            <span>{Object.keys(user.answers).length}</span>
                            <span>&nbsp;&nbsp;&nbsp;Answered questions</span>
                        </p>
                        <p className="px-3 py-1 border dark:border-dark-border rounded-md bg-orange-50 text-orange-400 dark:bg-dark">
                            <span>{user.questions.length}</span>
                            <span>&nbsp;&nbsp;&nbsp;Created questions</span>
                        </p>
                    </div>

                    <div className="flex-1 text-center flex flex-col justify-between px-3 py-2 border dark:border-dark-border rounded-md dark:bg-dark">
                        <p>Score</p>
                        <p className="font-bold text-lg">{user.questions.length + Object.keys(user.answers).length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
