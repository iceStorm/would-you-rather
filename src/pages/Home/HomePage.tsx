import { MessageBar, ProgressIndicator } from '@fluentui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

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
            <div className="container max-w-lg">
                {messageContent && (
                    <MessageBar messageBarType={messageType} onDismiss={(e) => clearMessage()}>
                        {messageContent}
                    </MessageBar>
                )}

                {!fetchingQuestions && allQuestions.length === 0 && <h1 className="container">No questions found.</h1>}
                {!fetchingQuestions && allQuestions.length > 0 && (
                    <div className="container">
                        {allQuestions.map((question) => (
                            <h1 key={question.id}>
                                <Link to={`/questions/${question.id}`}>{question.author}</Link>
                            </h1>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
