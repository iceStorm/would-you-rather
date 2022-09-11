import clsx from 'clsx'
import { UseControllerProps, useForm } from 'react-hook-form'

import { AppInputField } from '../../components/AppInputField'
import { AnswerOptionKey } from '../../models/Question'

import styles from './QuestionAddPage.module.scss'

export function QuestionAddPage() {
    const { handleSubmit, control } = useForm<{ [key in AnswerOptionKey]: string }>()

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
        console.log(data)
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

                <div className="flex flex-col mt-10">
                    <h1 className={clsx('text-2xl font-bold dark:text-gray-200 mb-5')}>Would you rather ...</h1>

                    <div className="flex flex-col gap-3">
                        <AppInputField
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
                            control={control}
                            name="optionTwo"
                            placeholder="Enter option two..."
                            rules={optionRule}
                        />
                    </div>
                </div>

                <button className="app-button w-full mt-10">Submit</button>
            </form>
        </div>
    )
}
