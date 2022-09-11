import { MessageBar } from '@fluentui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import { AppLoadingCircle } from '../../components/AppLoadingCircle'
import { AppInputField } from '../../components/AppInputField'
import { AppLogo } from '../../components/AppLogo'
import { useAppMessage } from '../../hooks/useAppMessage'
import { RegisterParams } from '../../models/RegisterParams'
import { register } from '../../store/auth/auth.thunks'
import { useAppDispatch } from '../../store/hooks'

import styles from './RegisterPage.module.css'

export function RegisterPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { messageType, messageContent, showMessage, clearMessage } = useAppMessage()
    const { control, handleSubmit } = useForm<RegisterParams>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = handleSubmit((data) => {
        setIsSubmitting(true)
        clearMessage()

        dispatch(register(data))
            .unwrap()
            .then(() => {
                // redirect to the login page with user registered info to auto fill
                navigate('/login', {
                    state: {
                        ...data,
                    },
                })
            })
            .catch((error) => {
                showMessage('error', error)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    })

    return (
        <div className="container pb-10">
            <form
                onSubmit={onSubmit}
                className={clsx(
                    'max-w-lg m-auto mt-10 border border-light-border dark:border-dark-border',
                    'rounded-md overflow-hidden',
                    'dark:bg-secondary-dark',
                    styles.registerForm,
                )}
            >
                <div className="form-wrapper p-5 px-7">
                    {/* heading */}
                    <div className="flex items-center gap-3 mb-14 mt-3">
                        <AppLogo style={{ width: 60, height: 60 }} className="drop-shadow-lg" />
                        <div className="flex flex-col dark:text-gray-200">
                            <h1 className="text-3xl font-bold">Sign Up.</h1>
                            <h5>To join our fancy community.</h5>
                        </div>
                    </div>

                    {/* fields */}
                    <div className="flex flex-col gap-3">
                        <AppInputField
                            type="text"
                            control={control}
                            name="username"
                            autoComplete="username"
                            placeholder="Username"
                            className="app-input-field"
                            disabled={isSubmitting}
                            rules={{ required: { message: 'Please fill out username', value: true } }}
                        />
                        <AppInputField
                            control={control}
                            name="fullName"
                            autoComplete="name"
                            placeholder="Full name"
                            className="app-input-field"
                            type="text"
                            disabled={isSubmitting}
                            rules={{ required: { message: 'Please fill out your full name', value: true } }}
                        />
                        <AppInputField
                            control={control}
                            name="password"
                            autoComplete="new-password"
                            placeholder="Password"
                            className="app-input-field"
                            type="password"
                            canRevealPasswords
                            disabled={isSubmitting}
                            rules={{ required: { message: 'Please fill out password', value: true } }}
                        />

                        {messageContent && (
                            <MessageBar messageBarType={messageType} onDismiss={(e) => clearMessage()}>
                                {messageContent}
                            </MessageBar>
                        )}

                        <div className="flex justify-start mt-5 pl-1">
                            <p>
                                Already have an account? &nbsp;
                                <Link to="/login" className={clsx('app-link', { disabled: isSubmitting })}>
                                    Sign in now!
                                </Link>
                            </p>
                        </div>

                        <button className="app-button mt-5" disabled={isSubmitting}>
                            <AppLoadingCircle showing={isSubmitting} />
                            <span> Register</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
