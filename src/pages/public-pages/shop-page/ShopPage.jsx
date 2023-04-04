import {  useParams } from "react-router-dom";
import { useEffect  } from "react";



const ShopPage = () => {

  let { shopname } = useParams();


  useEffect(() => {
    window.location = `https://droplinked.io/${shopname}`
  }, []);

  return (
    <>
    </>
  );
};

export default ShopPage;
