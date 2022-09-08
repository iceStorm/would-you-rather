import React from 'react'
import { Control, Controller, UseControllerProps } from 'react-hook-form'

export interface AppInputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
    control: Control<any>
    name: string
    rules?: UseControllerProps['rules']
    defaultValue?: any
    canRevealPasswords?: boolean
}

export function AppInputField(props: AppInputFieldProps) {
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
                            {...props}
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={fieldName}
                            defaultValue={undefined}
                            className="app-input-field"
                        />

                        {/* toggle password button */}
                        {props.canRevealPasswords && <button className="absolute right-0 top-0"></button>}
                    </div>

                    {/* error message */}
                    {error && error.message && <p></p>}
                </div>
            )}
        />
    )
}
