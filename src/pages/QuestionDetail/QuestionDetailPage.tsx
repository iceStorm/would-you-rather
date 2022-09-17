import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { AnswerOptionKey, AnswerOptionValue, Question } from '../../models/Question'
import { useAppDispatch } from '../../store'
import { getQuestionById, submitAnswer } from '../../store/questions/questions.thunks'
import { useAppMessage } from '../../hooks/useAppMessage'
import { MessageBar, Spinner } from '@fluentui/react'
import { getUserById } from '../../store/users/users.thunks'
import { selectCurrentUser } from '../../store/auth/auth.selectors'
import { AppLoadingCircle } from '../../components/AppLoadingCircle'
import { useAuthErrorHandler } from '../../hooks/useAuthErrorHandler'
import { User } from '../../models/User'
import { AppUserAvatar } from '../../components/AppUserAvatar'
import { getTimeOffsetString } from '../../utils/TimeUtils'

type OptionKeyValue = {
    key: AnswerOptionKey
    value: AnswerOptionValue
}

export function QuestionDetailPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { question_id } = useParams()
    const currentUser = selectCurrentUser()
    const [question, setQuestion] = useState<Question>()
    const [selected, setSelected] = useState('')
    const [options, setOptions] = useState<OptionKeyValue[]>([])
    const [questionAuthor, setQuestionAuthor] = useState<User>()
    const [isCurrentUserSelected, setIsCurrentUserSelected] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [totalVoteCounts, setTotalVoteCounts] = useState(0)
    const { messageType, messageContent, showMessage, clearMessage } = useAppMessage()

    useEffect(() => {
        if (!question_id) {
            console.log('question id not provided')
            return navigate('/')
        }

        // fetch question details from question id
        ;(async () => {
            try {
                const question = await dispatch(getQuestionById(question_id)).unwrap()
                const questionAuthor = await dispatch(getUserById(question.author)).unwrap()

                setQuestionAuthor(questionAuthor)
                setQuestion(question)
                setOptions([
                    {
                        key: 'optionOne',
                        value: question.optionOne,
                    },
                    {
                        key: 'optionTwo',
                        value: question.optionTwo,
                    },
                ])
                setTotalVoteCounts(question.optionOne.votes.length + question.optionTwo.votes.length)

                // check whether the question has been selected by current signed in user
                if (
                    question.optionOne.votes.includes(currentUser!.id) ||
                    question.optionTwo.votes.includes(currentUser!.id)
                ) {
                    setIsCurrentUserSelected(true)

                    const currentUserSelectedOption = question.optionOne.votes.includes(currentUser!.id)
                        ? question.optionOne.text
                        : question.optionTwo.text

                    // pre-populate the selected option of the current user
                    setSelected(currentUserSelectedOption)
                }
            } catch (error: any) {
                if (error.startsWith('Could not find a question with id')) {
                    navigate('/404')
                } else {
                    useAuthErrorHandler(error)
                }
            }
        })()
    }, [])

    function handleSubmit() {
        clearMessage()

        if (!selected) {
            return showMessage('warning', 'Please select an option to submit')
        }

        setIsSubmitting(true)
        dispatch(
            submitAnswer({
                questionId: question!.id,
                answer: question!.optionOne.text === selected ? 'optionOne' : 'optionTwo',
            }),
        )
            .unwrap()
            .then(() => {
                navigate(0)
            })
            .catch((error) => {
                useAuthErrorHandler(error)
                showMessage('error', error)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return (
        <div className="container max-w-lg mt-10">
            {!question && <Spinner label="Fetching question details..." />}

            {question && (
                <div className={clsx('border dark:border-dark-border rounded-md', 'dark:bg-secondary-dark')}>
                    <div className={clsx('p-3 px-5 text-center border-b dark:border-dark-border')}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <AppUserAvatar avatarName={questionAuthor?.avatarURL} className="w-5 h-5" />

                                <div>
                                    <span className="font-bold dark:text-gray-200">{questionAuthor?.name}</span>{' '}
                                    {!isCurrentUserSelected && <span> asks </span>}
                                    {isCurrentUserSelected && <span> asked </span>}
                                    <span>{getTimeOffsetString(question.timestamp)}</span>
                                </div>
                            </div>

                            <div>
                                {totalVoteCounts} vote{totalVoteCounts > 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        {!isCurrentUserSelected && <h2 className="dark:text-gray-200 mb-5">Would You Rather ...</h2>}

                        <RadioGroup value={selected} onChange={setSelected}>
                            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                            <div className="space-y-5">
                                {options.map((option, index) => (
                                    <RadioGroup.Option
                                        disabled={isSubmitting || isCurrentUserSelected}
                                        key={index}
                                        value={option.value.text}
                                        className={({ active, checked }) =>
                                            clsx(
                                                'border dark:border-dark-border',
                                                'relative flex rounded-md px-5 py-4 focus:outline-none',
                                                { 'cursor-pointer': !isCurrentUserSelected },
                                                checked
                                                    ? 'bg-third dark:bg-opacity-40 text-dark'
                                                    : 'dark:bg-dark bg-white',
                                            )
                                        }
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="">
                                                            <RadioGroup.Label
                                                                as="p"
                                                                className={clsx(
                                                                    'font-semibold',
                                                                    checked
                                                                        ? 'text-gray-700 dark:text-white'
                                                                        : 'text-gray-700 dark:text-gray-200',
                                                                )}
                                                            >
                                                                {isCurrentUserSelected && (
                                                                    <span>Would you rather </span>
                                                                )}

                                                                <span className="">{option.value.text}?</span>
                                                            </RadioGroup.Label>

                                                            {isCurrentUserSelected && (
                                                                <RadioGroup.Description
                                                                    as="span"
                                                                    className={clsx(
                                                                        'inline-flex gap-3 text-sm mt-2',
                                                                        checked
                                                                            ? 'text-gray-600 dark:text-gray-200'
                                                                            : 'text-gray-600 dark:text-gray-200',
                                                                    )}
                                                                >
                                                                    <span className="bg-white bg-opacity-20 rounded-md p-1 px-2 shadow">
                                                                        <span>
                                                                            <span>{option.value.votes.length}</span>{' '}
                                                                            vote
                                                                            {option.value.votes.length > 1 ? 's' : ''}
                                                                        </span>
                                                                    </span>

                                                                    <span className="bg-white bg-opacity-20 rounded-md p-1 px-2 shadow">
                                                                        <span>
                                                                            {(
                                                                                (option.value.votes.length /
                                                                                    totalVoteCounts) *
                                                                                100
                                                                            ).toFixed(0)}
                                                                            %
                                                                        </span>
                                                                    </span>

                                                                    {checked && (
                                                                        <span className="bg-white bg-opacity-20 rounded-md p-1 px-2 shadow">
                                                                            <span>Your vote</span>
                                                                        </span>
                                                                    )}
                                                                </RadioGroup.Description>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {checked && (
                                                        <div className="shrink-0 text-white dark:text-dark">
                                                            <CheckIcon className="h-6 w-6 drop-shadow-lg" />
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>

                        {!isCurrentUserSelected && (
                            <>
                                {messageContent && (
                                    <MessageBar
                                        messageBarType={messageType}
                                        onDismiss={(e) => clearMessage()}
                                        className="mt-5"
                                    >
                                        {messageContent}
                                    </MessageBar>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    className="app-button w-full mt-10"
                                    disabled={isSubmitting}
                                >
                                    <AppLoadingCircle showing={isSubmitting} />
                                    <span>Submit</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function CheckIcon(props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
