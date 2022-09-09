import { MessageBar, ProgressIndicator } from '@fluentui/react'
import { useEffect } from 'react'
import { useAppMessage } from '../../hooks/useAppMessage'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchAllQuestions } from '../../store/questions/questions.thunks'

export function HomePage() {
    const dispatch = useAppDispatch()
    const { allQuestions, fetchingQuestions } = useAppSelector((state) => state.questions)
    const { messageType, messageContent, showMessage, clearMessage } = useAppMessage()

    useEffect(() => {
        dispatch(fetchAllQuestions())
            .unwrap()
            .catch((error) => {
                showMessage('error', error)
            })
    }, [])

    return (
        <>
            {messageContent && (
                <MessageBar messageBarType={messageType} onDismiss={(e) => clearMessage()}>
                    {messageContent}
                </MessageBar>
            )}
            {fetchingQuestions && <ProgressIndicator label="Fetching Questions..." />}
            {!fetchingQuestions && allQuestions.length === 0 && <h1 className="container">No questions found.</h1>}ç
            {!fetchingQuestions && allQuestions.length > 0 && (
                <div className="container">
                    <h1>Home</h1>
                </div>
            )}
        </>
    )
}
