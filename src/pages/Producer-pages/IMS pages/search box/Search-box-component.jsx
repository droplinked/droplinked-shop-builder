import "./Search-box-style.scss"
import { BsSearch } from "react-icons/bs";

export default function SeachBox({ onch }) {
    return (
        <div className="d-flex justify-content-center align-items-center mb-4"
            style={{ width: "100%", height: "100px" }}
        >
            <div style={{ position: "relative" }}>
                <div className="seach-box-component">
                    <form name="search">
                        <input type="text"
                            className="input"
                            name="txt"
                            onMouseOut="document.search.txt.value = ''"
                            onChange={onch}
                        />
                    </form>
                    <div className="ic">
                        <BsSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}