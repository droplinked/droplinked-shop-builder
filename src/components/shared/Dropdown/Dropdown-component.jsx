//import "./Dropdown-style.scss"

// this component get array like this = [ {id:"" , value:""} , {id:"" , value:""} ]
//  pair id and value in objects
import { SelectComponent, OptionComponent } from "./dropdown-style";

export default function Dropdown({
  change,
  pairArray,
  value,
  placeholder,
  dark,
}) {
  return (
    <SelectComponent onChange={change} bg={dark ? "subLayer" : "mainLayer"}>
      {placeholder && (
        <OptionComponent
          value={value}
          selected
          disabled
          hidden
          bg={dark ? "subLayer" : "mainLayer"}
        >
          {placeholder}
        </OptionComponent>
      )}
      {pairArray.map((item, i) => {
        return (
          <OptionComponent
            key={i}
            value={item.id}
            bg={dark ? "subLayer" : "mainLayer"}
          >
            {item.value}
          </OptionComponent>
        );
      })}
    </SelectComponent>
  );
}

// <div className="basic-dropdown-component-wrapper">
//     <select name="collection" className="w-100" onChange={change}   >
//     <option value={value} selected disabled hidden >{placeholder}</option>
//         {pairArray.map((item, i) => {
//             return <option key={i} value={item.id} >{item.value}</option>
//         })}
//     </select>
// </div>
