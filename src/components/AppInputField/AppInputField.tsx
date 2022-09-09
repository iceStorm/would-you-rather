import { IInputProps } from '@fluentui/react'
import clsx from 'clsx'
import React, { HTMLInputTypeAttribute, useState } from 'react'
import { Control, Controller, UseControllerProps } from 'react-hook-form'

import eyeIcon from '../../assets/icons8-eye-48.png'
import eyeOffIcon from '../../assets/icons8-invisible-48.png'

export type AppInputFieldProps = React.HTMLAttributes<HTMLInputElement> &
    IInputProps & {
        control: Control<any>
        name: string
        rules?: UseControllerProps['rules']
        defaultValue?: any
        canRevealPasswords?: boolean
    }

export function AppInputField(props: AppInputFieldProps) {
    const { canRevealPasswords, type, ...nativeInputProps } = props
    const [isShownPassword, setIsShownPassword] = useState(false)

    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            defaultValue={props.defaultValue || ''}
            render={({ field: { onChange, onBlur, name: fieldName, value, ref }, fieldState: { error } }) => (
                <div className="flex flex-col">
                    <div className="relative">
                        {/* actual field */}
                        <input
                            {...nativeInputProps}
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={fieldName}
                            defaultValue={undefined}
                            className={clsx('app-input-field pr-14', { invalid: error && error.message })}
                            type={!canRevealPasswords ? type : isShownPassword ? 'text' : 'password'}
                        />

                        {/* toggle password button */}
                        {canRevealPasswords && (
                            <button
                                type="button"
                                title={isShownPassword ? 'Hide password' : 'Show password'}
                                onClick={(e) => setIsShownPassword(!isShownPassword)}
                                className="absolute right-1.5 top-1.5 hover:bg-gray-100 p-2.5 rounded-md"
                            >
                                {isShownPassword && (
                                    <img className="w-5 grayscale" src={eyeOffIcon} alt="hide_password" />
                                )}
                                {!isShownPassword && (
                                    <img className="w-5 grayscale" src={eyeIcon} alt="show_password" />
                                )}
                            </button>
                        )}
                    </div>

                    {/* error message */}
                    {error && error.message && <p className="text-brown pl-1 mt-1 mb-3">{error.message}</p>}
                </div>
            )}
        />
    )
}
