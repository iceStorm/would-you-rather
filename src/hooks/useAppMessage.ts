import { MessageBarType } from '@fluentui/react'
import { useState } from 'react'

export function useAppMessage() {
    const [_message, setMessage] = useState<string | JSX.Element>('')
    const [_type, setMessageType] = useState(MessageBarType.info)

    return {
        messageType: _type,
        messageContent: _message,
        clearMessage() {
            setMessage('')
        },
        showMessage(type: keyof typeof MessageBarType, content: string | JSX.Element) {
            setMessageType(MessageBarType[type])
            setMessage(content)
        },
    }
}
