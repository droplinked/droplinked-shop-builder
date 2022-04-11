import whitelogo from '../../../assest/image/footer/FlatlayLogo.svg';
import './footer.scss';
import { Text, Flex, Box, Image, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<>
			{/* <div
				className="d-flex justify-content-between"
				style={{ width: '100%', height: '80px', borderTop: '1px solid white' }}
			>
				<div
					className="d-flex row align-items-start justify-content-end"
					style={{ width: '88%', height: '100%', margin: 'auto auto' }}
				>
					<div className="col-12 col-md-4 footer-text d-flex justify-content-between">
						<p>
							<Text paddingLeft={'1PX'}>droplinked by</Text>
							<a
								href="https://flatlay.io/"
								style={{ color: 'inherit', textDecoration: 'none' }}
							>
								<img src={whitelogo} className="footer-icon" />
							</a>
						</p>
					</div>
				</div>
			</div> */}

			<Flex
				justifyContent={'flex-end'}
				paddingX="10"
				borderTop={'1px'}
				borderColor="white"
				paddingY={'2'}
			>
				<Link to={'/'}>
					<Box display={'flex'} flexDirection="column">
						<Text fontWeight={'bold'} fontSize="xl" color={'white'}>
							droplinked by
						</Text>
						<Image filter={'brightness(0) invert(1)'} src={whitelogo} />
					</Box>
				</Link>
			</Flex>
		</>
	);
}
