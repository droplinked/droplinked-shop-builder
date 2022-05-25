

export default function HeaderItem({children , click}) {
    return (<>
        <div className="header-item-btn-component-wraper" onClick={click}>{children}</div>
    </>)
}