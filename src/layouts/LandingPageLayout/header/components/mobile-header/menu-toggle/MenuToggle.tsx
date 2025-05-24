import React from 'react'
import styles from "./styles.module.scss"

function MenuToggle({ toggleMenus, isMenuActive }: { toggleMenus: () => void, isMenuActive: boolean }) {
    return (
        <div className={styles["input-group"]}>
            <input id='menu-toggle' type='checkbox' checked={isMenuActive} onChange={toggleMenus} />
            <label htmlFor='menu-toggle' className={styles.hamburger}>
                <div></div>
                <div></div>
                <div></div>
            </label>
        </div>
    )
}

export default MenuToggle