import { MessageBar } from '@fluentui/react'
import clsx from 'clsx'
import { useState } from 'react'
import { UseControllerProps, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { AppInputField } from '../../components/AppInputField'
import { AppLoadingCircle } from '../../components/AppLoadingCircle'
import { useAppMessage } from '../../hooks/useAppMessage'
import { AnswerOptionKey } from '../../models/Question'
import { useAppDispatch } from '../../store/hooks'
import { submitQuestion } from '../../store/questions/questions.thunks'

import styles from './QuestionAddPage.module.scss'

export function QuestionAddPage() {
    const dispatch = useAppDispatch()
    const { handleSubmit, control, setValue } = useForm<{ [key in AnswerOptionKey]: string }>()
    const { messageType, messageContent, showMessage, clearMessage } = useAppMessage()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const optionRule: UseControllerProps['rules'] = {
        required: {
            value: true,
            message: 'Please enter content',
        },
        pattern: {
            value: new RegExp(/[\S\s]+[\S]+/),
            message: 'Content can not be empty and must have two or more letters',
        },
    }

    const onFormSubmit = handleSubmit((data) => {
        setIsSubmitting(true)
        clearMessage()

        dispatch(submitQuestion(data))
            .unwrap()
            .then((question) => {
                showMessage(
                    'success',
                    <>
                        <span>Your question has been submitted successfully.</span>
                        <Link to={`/questions/${question?.id}`} className="app-link">
                            View now
                        </Link>
                    </>,
                )
                setValue('optionOne', '')
                setValue('optionTwo', '')
            })
            .catch((error) => {
                showMessage('error', error)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    })

    return (
        <div className="container max-w-lg">
            <form
                onSubmit={onFormSubmit}
                className={clsx(
                    'mt-10 w-full p-5 px-7 border dark:border-dark-border dark:bg-secondary-dark',
                    'rounded-md',
                )}
            >
                <div>
                    <h1 className={clsx('text-2xl font-bold')}>Create a question.</h1>
                    <h2>To see how the community reacts.</h2>
                </div>

                <div className="flex flex-col mt-10 mb-5">
                    <h1 className={clsx('text-2xl font-bold dark:text-gray-200 mb-5')}>Would you rather ...</h1>

                    <div className="flex flex-col gap-3">
                        <AppInputField
                            disabled={isSubmitting}
                            control={control}
                            name="optionOne"
                            placeholder="Enter option one..."
                            rules={optionRule}
                        />
                        <div className={clsx(styles.divider)}>
                            <span className="bg-slate-300 dark:bg-slate-600"></span>
                            <span className={clsx('font-semibold')}>OR</span>
                            <span className="bg-slate-300 dark:bg-slate-600"></span>
                        </div>
                        <AppInputField
                            disabled={isSubmitting}
                            control={control}
                            name="optionTwo"
                            placeholder="Enter option two..."
                            rules={optionRule}
                        />
                    </div>
                </div>

                {messageContent && (
                    <MessageBar messageBarType={messageType} onDismiss={(e) => clearMessage()}>
                        {messageContent}
                    </MessageBar>
                )}

                <button className={clsx('app-button w-full mt-10')} disabled={isSubmitting}>
                    <AppLoadingCircle showing={isSubmitting} />
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
}
