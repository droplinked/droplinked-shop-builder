
import Footer from "../../components/features/footer/Footer"
import MainHeader from "../../components/features/header/MainHeader"
import React from 'react';
import axios from "axios"




export default function Test1() {
  let image;


//  axios.get('https://gamma.io/api/v1/collections/SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ.crashpunks-v2/floor')
//       .then(res => { console.log(res) })
//       .catch(e => { console.log(e) })

  function base64ToImage(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }


  const changeimg = (e) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file );

    axios.post('http://18.215.217.156:2021/upload', formData , {
      header:{'Access-Control-Allow-Origin' : '*'}
    })

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

  function changeAvatar() {
    if (image) {
      const img = base64ToImage(image, "image");
      const formData = new FormData();
      formData.append("image", img, img.name);

      axios.post('http://18.215.217.156:2021/upload', formData , {
        header:{'Access-Control-Allow-Origin' : '*'}
      })
        .then(res => { console.log(res) })
        .catch(e => { console.log(e) })

    }
  }


  return (
    <>


      <input type="file"  onChange={changeimg}/>


    </>

  )
}

