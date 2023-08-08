export const isValidData = (shopData) => {
  let result = true;

  if (shopData.backgroundImage.length === 0) {
    result = false;
  } else if (shopData.headerIcon.length === 0) {
    result = false;
  } else if (shopData.backgroundText.length === 0) {
    result = false;
  } else if (shopData.logo.length === 0) {
    result = false;
  } else if (shopData.theme === "theme-2" && shopData.backgroundColor === "") {
    result = false;
  } else if (shopData.theme === "theme-3" && shopData.backgroundColor === "") {
    result = false;
  }

  return result;
};

export const refactorDesignData = (data) => {
  return {
    logo: data.logo ? data.logo : "",
    headerIcon: data.headerIcon ? data.headerIcon : "",
    textColor: data.textColor ? data.textColor : "#000",
    theme: data.theme ? data.theme : "theme-2",
    backgroundText: data.backgroundText ? data.backgroundText : "",
    backgroundImage: data.backgroundImage ? data.backgroundImage : "",
    backgroundImageSecondary: data.backgroundImageSecondary
      ? data.backgroundImageSecondary
      : "",
    backgroundColor: data.backgroundColor ? data.backgroundColor : "#ffffff",
    productSectionText: data.productSectionText,
    fullWidthHero: data.fullWidthHero
  };
};
