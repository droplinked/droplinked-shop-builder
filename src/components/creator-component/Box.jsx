import creatorPic from "../../assest/search/creator.svg"
import axios from "axios"
import { useEffect, useState } from 'react'
import ShopifyCard from "./ShopifyCard"

import iconbg from "../../assest/creator/search/icon-bg.svg"
import productIcon from "../../assest/creator/search/product.svg"
export default function Box(){
const[products , setProducts] = useState([]);
    
    const keyword = 'nike'
    const page = 1
    
    


        function getData(){
            axios({
                method: 'post',
                url: '/v1/search',
                baseURL: 'https://r4qwnd5837.execute-api.us-west-2.amazonaws.com',
                data: {
                    keyword,
                    page,
                },
            })
                .then(response => {
                    console.log(response.data.frenzy);
                    setProducts(response.data.frenzy)
                })
                


        }
      

        
  useEffect(() => {
    getData();
  }, [])




    return(
        <section style={{padding:'20px'}}>
            <div className="box">
                <div className="search-component products all">
                   <h2 className="font-gt mt-3 mb-0 d-flex align-items-center">
                       <span
                         className="mr-2"
                         style={{background:`${iconbg}`, center:'no-repeat'}}
                         >
                             <img src={productIcon} alt="" />
                       </span>
                       Products
                    </h2>
                    {products != undefined && 
                        <div className="list">
                        <div className="bullet-wrap row" >
                            {products.map((product)=>{
                                return(
                                    <div className="col-6">
                                        <ShopifyCard product={product}/>
                                     </div>
                                )
                                
                            })}
                        </div>
                     </div>
                    }
                     
                     {products == undefined && 
                            <span
                                className="d-flex justify-content-center align-items-center my-4"
                            >
                                <i>loading...</i>
                            </span>
                        }
                </div>
            </div>
            
        </section>
    )
}