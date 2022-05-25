import "./Shop-page-style.scss"
import axios from "axios"
import { useParams } from "react-router-dom";

export default function ShopPage(){
    let { shopname } = useParams();
    

    return(<><h1>{ shopname } </h1></>)
}