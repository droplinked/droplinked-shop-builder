import "./App.scss";
import NotFound from "./layout/notfound/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./sevices/context/context";
import ProfileContextProvider from "./sevices/context/ProfileContext";
import CartContextProvider from "./sevices/context/CartContext";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/features/footer/Footer";
import MainHeader from "./components/features/header/MainHeader";
import HomeWrapper from "./components/Structure/new wrapper/HomeWrapper";
import CreatorPage from "./layout/creator/CreatorPage";
import PostPage from "./layout/postpage/PostPage";
import CollectionPage from "./layout/collection page/CollectionPage";
import Checkout from "./layout/checkout/Checkout";
import HomePage from "./layout/homepage test/HomePage";
import BuyProduct from "./layout/buy product/BuyProduct";
import Terms from "./layout/terms/Terms";
import Privacy from "./layout/privacy/Privacy";
import Crashpunks from "./layout/crashpunk/crashpunks";   //crashpunks page
import ProctuPageTest from "./layout/product list test/ProctuPageTest";
import Address from "./layout/address/Address";
import Shipping from "./layout/shiping/Shipping";
import Payments from "./layout/payment/Payments";
import Confirm from "./layout/confirm/Confirm";
import CollectionManagement from "./layout/Brand/management/CollectionManagement";
import Settings from "./layout/Customer/settings/Setting";
import NewProduct from "./layout/newProduct/NewProduct";
import CrashpunkDemo from "./layout/crash punks demo/CrahspunkDemo";
import ThankPage from "./layout/registering/thanks for register/ThankForRegister";
import PersonalInfo from "./layout/registering/personal info/PersonalInfo";
import ShopInfo from "./layout/registering/shop info/ShopInfo";
import ImsSelect from "./layout/registering/IMS select/ImsSelect";
import RegisterPayment from "./layout/registering/register payment page/RegisterPayment";
import Test1 from "./layout/test/Test1";
import ScrollTop from "./components/features/scrolltop/ScrollTop";
import ShopPage from "./layout/Producer pages/Main page/shop page/Shop-page-component";
import ImsMainPage from "./layout/Producer pages/IMS pages/ImsMainPage";
import AddProductPage from "./layout/Producer pages/add product page/Add-product-page";
import RuleSetPage from "./layout/Producer pages/ruleset page/RuleSet-page-component"
import CollectionMainPage from "./layout/Producer pages/collection pages/Collection main page/Collection-mainpage-component";
import AddCollectionPage from "./layout/Producer pages/collection pages/add collection page/Add-collection-component"



function App() {
	return (
		<div style={{ backgroundColor: "#222" }}>
			<ProfileContextProvider>
				<ChakraProvider>
					<CartContextProvider>
						<WalletProvider>
							<BrowserRouter>
								<MainHeader />
								<HomeWrapper>
									<ScrollTop>
										<Routes>
											<Route exact path="/" element={<HomePage />} />
											<Route path="/register/personalInfo" element={<PersonalInfo />}/>
											<Route path="/register/shopInfo" element={<ShopInfo />} />
											<Route path="/register/IMSSelect"element={<ImsSelect />}/>
											<Route path="/register/payment"	element={<RegisterPayment />}	/>

											<Route path="/producer/ims" element={<ImsMainPage />} />
											<Route path="/producer/addProduct"	element={<AddProductPage />}/>
											<Route path="/producer/ruleset" element={<RuleSetPage />} />
											<Route path="/producer/collection" element={<CollectionMainPage />} />
											<Route path="/producer/collection/addCollection" element={<AddCollectionPage />} />

											<Route path="/creatorpage" element={<CreatorPage />} />
											<Route path="/postpage" element={<PostPage />} />
											<Route path="/collectionpage"	element={<CollectionPage />}	/>
											<Route path="/cart" element={<Checkout />} />
											<Route path="/collectionmanagement"	element={<CollectionManagement />}/>
											<Route path="/crashpunksdemo" element={<CrashpunkDemo />}/>
											<Route path="/shop/:shopname" element={<ShopPage />} />
											<Route path="/addProduct" element={<NewProduct />} />
											<Route path="/address" element={<Address />} />
											<Route path="/shipping" element={<Shipping />} />
											<Route path="/productList" element={<ProctuPageTest />} />
											<Route path="/payment" element={<Payments />} />
											<Route path="/settings" element={<Settings />} />
											<Route path="/terms" element={<Terms />} />
											<Route path="/privacy" element={<Privacy />} />
											<Route path="/confirm" element={<Confirm />} />
											<Route path="/crashpunks" element={<CreatorPage />} />
											<Route
												path="/emailConfirmation"
												element={<ThankPage />}
											/>
											<Route path="/product/:id" element={<BuyProduct />} />
											<Route path="test" element={<Test1 />} />
											<Route path="/*" element={<NotFound />} />
										</Routes>
									</ScrollTop>
								</HomeWrapper>
								<Footer />
							</BrowserRouter>
						</WalletProvider>
					</CartContextProvider>
				</ChakraProvider>
			</ProfileContextProvider>
		</div>
	);
}

export default App;
