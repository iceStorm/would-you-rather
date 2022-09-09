import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MessageBar, ProgressIndicator } from '@fluentui/react'
import clsx from 'clsx'

import { AppInputField } from '../../components/AppInputField'
import { AppLogo } from '../../components/AppLogo'
import { useAppMessage } from '../../hooks/useAppMessage'
import { LoginParams } from '../../models/LoginParams'
import { RegisterParams } from '../../models/RegisterParams'
import { useAppDispatch } from '../../store'
import { login } from '../../store/auth/auth.thunks'
import { selectAuthState } from '../../store/auth/auth.selectors'
import styles from './LoginPage.module.css'
import { useAppSelector } from '../../store/hooks'

export function LoginPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { isSigningIn } = useAppSelector((state) => state.auth)
    const { control, handleSubmit, setValue } = useForm<LoginParams>()
    const { messageType, messageContent, showMessage, clearMessage } = useAppMessage()

    useEffect(() => {
        // auto fill the login form fields if was sent from registe page
        if (location.state && (location.state as RegisterParams).username) {
            setValue('username', (location.state as RegisterParams).username)
            setValue('password', (location.state as RegisterParams).password)
            showMessage('success', 'Successfully registered. Now you can sign in using the credentials.')
        }

        if (location.state && (location.state as any).error) {
            showMessage('error', (location.state as any).error)
        }
    }, [])

    const onSubmit = handleSubmit((data) => {
        clearMessage()

        dispatch(login(data))
            .unwrap()
            .then(() => {
                navigate((location.state as any).from || '/')
            })
            .catch((error) => {
                showMessage('error', error)
            })
    })

    return (
        <div className="container">
            <form
                onSubmit={onSubmit}
                className={clsx(
                    'max-w-lg m-auto mt-10 border border-gray-100 shadow rounded-md overflow-hidden',
                    styles.loginForm,
                )}
            >
                <ProgressIndicator progressHidden={!isSigningIn} barHeight={3} className="-mt-2" />

                <div className="form-wrapper p-5 px-7">
                    {/* heading */}
                    <div className="flex items-center gap-3 mb-14 mt-3">
                        <AppLogo style={{ width: 60, height: 60 }} className="drop-shadow-lg" />
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold">Sign In.</h1>
                            <h5 className="">To express your desires.</h5>
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
                            disabled={isSigningIn}
                            rules={{ required: { message: 'Please fill out username', value: true } }}
                        />
                        <AppInputField
                            control={control}
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            className="app-input-field"
                            type="password"
                            canRevealPasswords
                            disabled={isSigningIn}
                            rules={{ required: { message: 'Please fill out password', value: true } }}
                        />

                        {messageContent && (
                            <MessageBar messageBarType={messageType} onDismiss={(e) => clearMessage()}>
                                {messageContent}
                            </MessageBar>
                        )}

                        <div className="flex justify-start mt-5 pl-1">
                            <p>
                                Don't have an account? &nbsp;
                                <Link to="/register" className={clsx('app-link', { disabled: isSigningIn })}>
                                    Create one!
                                </Link>
                            </p>
                        </div>

                        <button className="app-button mt-5" disabled={isSigningIn}>
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
