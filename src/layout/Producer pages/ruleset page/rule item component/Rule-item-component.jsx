import "./Rule-item-style.scss"

export default function RuleItem({ name, rules }) {
    return (
        <div className="rule-item-wrapper">
            <div className="name"><p>{name}</p></div>
            {rules.map((rule, i) => {
                return (<div className="w-100 d-flex justify-content-between mt-1 mb-1" key={i}>
                    <p className="address">{rule.address}</p>
                    <p className="nft">{rule.type}</p>
                </div>)
            })}
            <div className="w-100 d-flex justify-content-between mt-4">
                <button className="btn-rule-item" style={{color:"#fd6060"}}>delete</button>
                <button className="btn-rule-item" style={{color:"#8053ff"}}>edit</button>
            </div>
        </div>
    )
}