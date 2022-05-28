import "./Search-box-style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SeachBox() {
    return (
        <div className="seach-box-component">
            <form name="search">
                <input type="text" className="input" name="txt"
                    onmouseout="document.search.txt.value = ''" />
            </form>
           {/* <i className="fas fa-search" />  */}
           <FontAwesomeIcon icon="fas fa-search" />
           <i className='fas fa-search' style={{color:"white"}}></i>
        </div>
    )
}