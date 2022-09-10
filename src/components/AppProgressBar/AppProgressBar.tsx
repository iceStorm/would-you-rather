import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'

export function AppProgressBar() {
    nprogress.configure({
        parent: 'main',
        // speed: 750,
        trickleSpeed: 540,
    })

    useEffect(() => {
        nprogress.start()

        return () => {
            nprogress.done()
        }
    }, [])

    return <></>
}
