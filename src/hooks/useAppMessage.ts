import { MessageBarType } from '@fluentui/react'
import { useState } from 'react'

export function useAppMessage() {
    const [_message, setMessage] = useState('')
    const [_type, setMessageType] = useState(MessageBarType.info)

    return {
        messageType: _type,
        messageContent: _message,
        clearMessage() {
            setMessage('')
        },
        showMessage(type: keyof typeof MessageBarType, content: string) {
            setMessageType(MessageBarType[type])
            setMessage(content)
        },
    }
}
