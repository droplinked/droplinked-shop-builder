
import Footer from "../../components/features/footer/Footer"
import MainHeader from "../../components/features/header/MainHeader"
import React from 'react';
import axios from "axios"




export default function Test1() {
 

  const changeimg = (e) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    axios.post('http://18.215.217.156:2021/upload', formData)
      .then(e =>{
       
      })
      .catch(e => console.log(e))


    // const reader = new FileReader();
    // reader.onload = () => {
    //   image = reader.result.toString();
    //   changeAvatar();
    // };
    // reader.readAsDataURL(file);

    // axios.post('http://18.215.217.156:2021/upload', {image:formData})
    //   .then(res => { console.log(res) })
    //   .catch(e => { console.log(e) })
  }

  return (
    <>
      <input type="file" onChange={changeimg} />
    </>

  )
}

