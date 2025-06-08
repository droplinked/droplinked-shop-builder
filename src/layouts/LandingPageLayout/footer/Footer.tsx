import { Box } from '@chakra-ui/react';
import * as React from 'react';
import NewsLetter from './components/newsLetter/NewsLetter';
import IconsSection from './components/iconsSection/IconsSection';
import LinksSection from './components/links/LinksSection';
import Copyright from './components/copyright/Copyright';
import { useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();
    const withoutNewsletterPage = ["/payment-links", "/shop-management"]

    return (
        <Box width={"100%"}>
            {!withoutNewsletterPage.includes(location.pathname) && <NewsLetter />}
            <Box px={{ sm: "2rem", md: "6rem" }} background={"#000"} display={"flex"} py={"4rem"} flexDirection={{ sm: "column", md: "column", lg: "row" }} justifyContent={"space-around"} alignItems={"start"} width={"100%"}>
                <IconsSection />
                <LinksSection />
            </Box>
            <Copyright />
        </Box>
    );
}

export default Footer;