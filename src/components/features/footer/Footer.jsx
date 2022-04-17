import whitelogo from "../../../assest/image/footer/FlatlayLogo.svg";
import "./footer.scss";
import { Text, Flex, Box, Image, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-wrap">
      <div className="footer-body d-flex align-item-center">
				<div className="text"><p>droplinked by</p></div>
				<Link to={'/'}>
				<Image filter={'brightness(0) invert(1)'} src={whitelogo} maxW="45vw"/>
				</Link>
	  </div>
    </div>
  );
}

{
  /* <Flex
				justifyContent={'flex-start'}
				borderColor="white"
				paddingY={'2'}
			>
				<Link to={'/'}>
					<Box display={'flex'} flexDirection="row">
						<Text fontWeight={'bold'} fontSize="l" color={'white'} mr={"3"}>droplinked by  </Text>  
						<Image filter={'brightness(0) invert(1)'} src={whitelogo}  maxW="45vw"/>
					</Box>
				</Link>
			</Flex> */
}

{
  /* <div className="d-flex justify-content-between"
            style={{ width: "100%", height: "80px", borderTop: "1px solid white" }}
                 >       
                <div className="d-flex row align-items-start justify-content-end"
                 style={{width:"88%" , height:"100%" ,  margin:"auto auto"  }}>
                     <div className="col-12 col-md-4 footer-text d-flex justify-content-between" >
                     <p>droplinked by  <a href="https://flatlay.io/" style={{color:"inherit" , textDecoration:"none" }}><img src={whitelogo} className="footer-icon" /> </a></p>
                     </div>
    
                 </div>
            
        </div> */
}
