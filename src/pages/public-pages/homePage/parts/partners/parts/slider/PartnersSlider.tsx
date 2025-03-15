import { Box, Image } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import MainCard from '../../../parts/card/MainCard';
import './styles.css';

function PartnersSlider() {
	const sliderRef = useRef(null);
	const partners = [
		{
			title: 'Unstoppable',
			url: 'https://shop.unstoppabledomains.com/',
			icon: '/assets/images/homepage/uns.svg',
		},
		{
			title: 'SwissBorg',
			url: 'https://droplinked.io/swissborg',
			icon: '/assets/images/homepage/swissborg.jpeg',
		},
		{
			title: 'Casper Punks',
			url: 'https://shop.casperpunks.io/',
			icon: '/assets/images/homepage/casper.svg',
		},
		{
			title: 'SKALE',
			url: 'https://droplinked.io/skale',
			icon: '/assets/images/homepage/skale.svg',
		},
		{
			title: 'Polygon',
			url: 'https://droplinked.io/polygon',
			icon: '/assets/images/homepage/polygan.svg',
		},
		{
			title: 'Near HZN1',
			url: 'https://droplinked.io/nearhorizon',
			icon: '/assets/images/homepage/near-horizon.png',
		},
		{
			title: 'Format One',
			url: 'https://droplinked.io/formatone',
			icon: '/assets/images/homepage/format-one.jpeg',
		},
		{
			title: 'Crashpunks',
			url: 'https://droplinked.io/crashpunks',
			icon: '/assets/images/homepage/crashpunks.jpg',
		},
		{
			title: 'Tenamint',
			url: 'https://droplinked.io/tenamint',
			icon: '/assets/images/homepage/tenamint.jpg',
		},
		{
			title: 'Supernova',
			url: 'https://droplinked.io/supernova',
			icon: '/assets/images/homepage/supernova.svg',
		},
		{
			title: 'Ample',
			url: 'https://droplinked.io/ample',
			icon: '/assets/images/homepage/ample.png',
		},
		{
			title: 'Hungry Artist',
			url: 'https://droplinked.io/hungryartist',
			icon: '/assets/images/homepage/hungry-artist.png',
		},
		{
			title: 'Elixir',
			url: 'https://droplinked.io/elixir',
			icon: '/assets/images/homepage/elixir.jpeg',
		},
	];
	const settings = {
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: false,
		arrows: false,
		customPaging: (i: number) => <Box className="custom-slick-dot" />,
		dots: true,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 350,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<Box width={'100%'}>
			<Slider ref={sliderRef} {...settings}>
				{partners.map((partner, key) => {
					const { title, icon, url } = partner;
					return (
						<MainCard
							key={key}
							display={'flex'}
							transition="1s"
							padding={{
								base: 4,
								md: 6,
								lg: 8,
							}}
						>
							<Image
								width={{
									base: '36px',
									md: '64px',
								}}
								aspectRatio={1}
								objectFit={'contain'}
								src={icon}
								alt={title}
							/>
							<AppTypography
								marginBlock={2}
								fontSize={{
									sm: '16px',
									lg: '24px',
								}}
								fontWeight="bold"
								color="#f5f5f5"
								whiteSpace={'nowrap'}
							>
								{title}
							</AppTypography>
							<a href={url} target="_blank" rel="noopener noreferrer">
								<AppTypography
									backgroundColor="neutral.gray.800"
									color="#C2C2C2"
									textAlign="center"
									borderRadius="8px"
									lineHeight="40px"
									height="40px"
									fontSize={{
										base: '14px',
										md: '16px',
									}}
									fontWeight="normal"
								>
									View Store
								</AppTypography>
							</a>
						</MainCard>
					);
				})}
			</Slider>
		</Box>
	);
}

export default PartnersSlider;
