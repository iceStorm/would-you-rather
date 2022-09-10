import moon from '../../assets/icons8-do-not-disturb-ios-48.png'
import sun from '../../assets/icons8-sun-48.png'
import laptop from '../../assets/icons8-laptop-48.png'

export function AppColorSwitcher() {
    return (
        <div className="cursor-pointer">
            <img src={moon} alt="" className="w-5 dark:invert" />
        </div>
    )
}
