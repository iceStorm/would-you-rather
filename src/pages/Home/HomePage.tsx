import { MessageBar, Spinner } from '@fluentui/react'
import { useEffect, useMemo, useState } from 'react'
import { Tab } from '@headlessui/react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useAppMessage } from '../../hooks/useAppMessage'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchAllQuestions } from '../../store/questions/questions.thunks'
import { fetchAllUsers } from '../../store/users/users.thunks'
import { selectCurrentUser } from '../../store/auth/auth.selectors'
import { useAuthErrorHandler } from '../../hooks/useAuthErrorHandler'
import { AppUserAvatar } from '../../components/AppUserAvatar'
import { getTimeOffsetString } from '../../utils/TimeUtils'

export function HomePage() {
    const dispatch = useAppDispatch()
    const { allQuestions, fetchingQuestions } = useAppSelector((state) => state.questions)
    const { allUsers } = useAppSelector((state) => state.users)
    const { messageType, messageContent, showMessage, clearMessage } = useAppMessage()
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const currentUser = selectCurrentUser()

    useEffect(() => {
        dispatch(fetchAllQuestions())
            .unwrap()
            .then((questions) => {
                dispatch(fetchAllUsers()).catch((error) => {
                    useAuthErrorHandler(error)
                    showMessage('error', error)
                })
            })
            .catch((error) => {
                useAuthErrorHandler(error)
                showMessage('error', error)
            })
    }, [])

    let categoriedQuestions = useMemo(() => {
        const Unanswered = allQuestions.filter(
            (question) =>
                !question.optionOne.votes.includes(currentUser!.id) &&
                !question.optionTwo.votes.includes(currentUser!.id),
        )
        Unanswered.sort((a, b) => b.timestamp - a.timestamp)

        const Answered = allQuestions.filter(
            (question) =>
                question.optionOne.votes.includes(currentUser!.id) ||
                question.optionTwo.votes.includes(currentUser!.id),
        )
        Answered.sort((a, b) => b.timestamp - a.timestamp)

        const Created = allQuestions.filter((question) => question.author === currentUser!.id)
        Created.sort((a, b) => b.timestamp - a.timestamp)

        return { Unanswered, Answered, Created }
    }, [allQuestions, allUsers])

    return (
        <>
            <div className="container max-w-lg mt-5">
                {fetchingQuestions && <Spinner label="Fetching questions..." />}

                {messageContent && (
                    <MessageBar messageBarType={messageType} onDismiss={(e) => clearMessage()} className="mb-10">
                        {messageContent}
                    </MessageBar>
                )}

                {!fetchingQuestions && allQuestions.length === 0 && <h1 className="">No questions found.</h1>}
                {!fetchingQuestions && allQuestions.length > 0 && allUsers.length > 0 && (
                    <div className="">
                        <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
                            <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 dark:bg-secondary-dark p-1 border dark:border-dark-border">
                                {Object.keys(categoriedQuestions).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            clsx(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary',
                                                'focus:border-none',
                                                selected
                                                    ? 'bg-white dark:bg-dark shadow'
                                                    : 'text-gray-400 hover:bg-white/[0.12] hover:text-gray-500 dark:hover:text-white',
                                            )
                                        }
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                {Object.entries(categoriedQuestions).map(([category, questions], idx) => (
                                    <Tab.Panel
                                        key={idx}
                                        className={clsx(
                                            'rounded-xl bg-white dark:bg-secondary-dark shadow p-3',
                                            'border dark:border-dark-border',
                                        )}
                                    >
                                        <ul>
                                            {!questions.length && category === 'Unanswered' && (
                                                <h1 className="text-sm p-3">
                                                    <span>No new question for you to answer.&nbsp;</span>
                                                    <Link to="/questions/add" className="app-link">
                                                        Create your own!
                                                    </Link>
                                                </h1>
                                            )}
                                            {!questions.length && category === 'Answered' && (
                                                <h1 className="text-sm p-3">
                                                    <span>You have not answered any questions yet.&nbsp;</span>
                                                    <Link to="/questions/add" className="app-link">
                                                        Create your own!
                                                    </Link>
                                                </h1>
                                            )}
                                            {!questions.length && category === 'Created' && (
                                                <h1 className="text-sm p-3">
                                                    <span>You have not created any questions yet.&nbsp;</span>
                                                    <Link to="/questions/add" className="app-link">
                                                        Create one!
                                                    </Link>
                                                </h1>
                                            )}

                                            {questions.map((question) => (
                                                <li
                                                    key={question.id}
                                                    className="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-slate-900"
                                                >
                                                    <h3 className="text-sm font-medium leading-5 line-clamp-1">
                                                        Would you rather{' '}
                                                        <span className="text">{question.optionOne.text}</span>
                                                        ...
                                                    </h3>

                                                    <ul className="mt-1 flex items-center space-x-1 text-xs font-normal leading-4 text-gray-500">
                                                        <li className="flex items-center gap-1">
                                                            <AppUserAvatar
                                                                className="w-5"
                                                                avatarName={
                                                                    allUsers.find((user) => user.id === question.author)
                                                                        ?.avatarURL
                                                                }
                                                            />
                                                            {allUsers.find((user) => user.id === question.author)?.name}
                                                        </li>
                                                        <li>&middot;</li>
                                                        <li>{getTimeOffsetString(question.timestamp)}</li>
                                                        <li>&middot;</li>
                                                        <li>
                                                            {question.optionOne.votes.length +
                                                                question.optionTwo.votes.length}{' '}
                                                            votes
                                                        </li>
                                                    </ul>

                                                    <Link
                                                        to={`/questions/${question.id}`}
                                                        className={clsx(
                                                            'absolute inset-0 rounded-md',
                                                            'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                                                        )}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                )}
            </div>
        </>
    )
}
