import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { selectCurrentShop } from "../../store/shop/shop.selector";

import Loading from "../../components/shared/loading/Loading";
import FormInput from "../../components/shared/FormInput/FormInput";

const AdminPage = () => {
  const shopData = useSelector(selectCurrentShop);
  // states
  const [description, setDescription] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [shopifyDomain, setShopifyDomain] = useState("");
  const [headerIcon, setHeaderIcon] = useState("");
  const [backgroundText, setBackgroundText] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundImageSecondary, setBackgroundImageSecondary] = useState("");
  const [infoEmail, InfoEmail] = useState("");
  // changes
  const changeDescription = (e) => setDescription(e.target.value);
  const changeDiscordUrl = (e) => setDiscordUrl(e.target.value);
  const changeInstagramUrl = (e) => setInstagramUrl(e.target.value);
  const changeLogo = (e) => setLogo(e.target.value);
  const changeName = (e) => setName(e.target.value);
  const changeTwitterUrl = (e) => setTwitterUrl(e.target.value);
  const changeWebUrl = (e) => setWebUrl(e.target.value);
  const changeShopifyDomain = (e) => setShopifyDomain(e.target.value);
  const changeHeaderIcon = (e) => setHeaderIcon(e.target.value);
  const changeBackgroundText = (e) => setBackgroundText(e.target.value);
  const changeBackgroundImage = (e) => setBackgroundImage(e.target.value);
  const changeBackgroundImageSecondary = (e) =>
    setBackgroundImageSecondary(e.target.value);
  const changeInfoEmail = (e) => InfoEmail(e.target.value);

  useEffect(() => {
    // initial values
    if (shopData.description) setDescription(shopData.description);
    if (shopData.discordUrl) setDiscordUrl(shopData.discordUrl);
    if (shopData.instagramUrl) setInstagramUrl(shopData.instagramUrl);
    if (shopData.logo) setLogo(shopData.logo);
    if (shopData.name) setName(shopData.name);
    if (shopData.twitterUrl) setTwitterUrl(shopData.twitterUrl);
    if (shopData.webUrl) setWebUrl(shopData.webUrl);
    if (shopData.shopifyDomain) setShopifyDomain(shopData.shopifyDomain);
    if (shopData.headerIcon) setHeaderIcon(shopData.headerIcon);
    if (shopData.backgroundText) setBackgroundText(shopData.backgroundText);
    if (shopData.backgroundImage) setBackgroundImage(shopData.backgroundImage);
    if (shopData.backgroundImageSecondary)
      setBackgroundImageSecondary(shopData.backgroundImageSecondary);
    if (shopData.infoEmail) InfoEmail(shopData.infoEmail);
  }, [shopData]);

  if (shopData == null) return <Loading />;

  return (
    <>
      <h1 style={{ color: "white", fontSize: "32px" }}>admin page</h1>
      <div style={{ backgroundColor: "gray", padding: "80px" }}>
        <FormInput
          value={description}
          label="description"
          placeholder="description"
          changeValue={changeDescription}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={discordUrl}
          label="discordUrl"
          placeholder="discordUrl"
          changeValue={changeDiscordUrl}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={instagramUrl}
          label="instagramUrl"
          placeholder="instagramUrl"
          changeValue={changeInstagramUrl}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={logo}
          label="logo"
          placeholder="logo"
          changeValue={changeLogo}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={name}
          label="name"
          placeholder="name"
          changeValue={changeName}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={twitterUrl}
          label="twitterUrl"
          placeholder="twitterUrl"
          changeValue={changeTwitterUrl}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={webUrl}
          label="webUrl"
          placeholder="webUrl"
          changeValue={changeWebUrl}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={shopifyDomain}
          label="shopifyDomain"
          placeholder="shopifyDomain"
          changeValue={changeShopifyDomain}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={headerIcon}
          label="headerIcon"
          placeholder="headerIcon"
          changeValue={changeHeaderIcon}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={backgroundText}
          label="backgroundText"
          placeholder="backgroundText"
          changeValue={changeBackgroundText}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={backgroundImage}
          label="backgroundImage"
          placeholder="backgroundImage"
          changeValue={changeBackgroundImage}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={backgroundImageSecondary}
          label="backgroundImageSecondary"
          placeholder="backgroundImageSecondary"
          changeValue={changeBackgroundImageSecondary}
        />
        <div style={{ marginBottom: "20px" }}></div>
        <FormInput
          value={infoEmail}
          label="infoEmail"
          placeholder="infoEmail"
          changeValue={changeInfoEmail}
        />
        <div style={{ marginBottom: "20px" }}></div>
      </div>
    </>
  );
};

export default AdminPage;
