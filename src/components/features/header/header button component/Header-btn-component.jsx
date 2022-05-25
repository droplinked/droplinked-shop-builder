

export default function HeaderItem({children , click , style}) {
    return (<>
        <div className="header-item-btn-component-wraper" onClick={click} style={style}>{children}</div>
    </>)
}