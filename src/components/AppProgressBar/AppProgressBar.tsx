import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function AppProgressBar() {
    // const location = useLocation()
    console.log('render progress bar...')

    useEffect(() => {
        nprogress.configure({
            // parent: 'main'
        })
        nprogress.start()

        return () => {
            nprogress.done()
        }
    }, [])

    return <></>
}
