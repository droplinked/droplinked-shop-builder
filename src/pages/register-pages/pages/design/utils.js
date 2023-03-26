export const isValidData = (shopData) => {
  let result = true;

  if (shopData.backgroundImage.length === 0) {
    result = false;
  } else if (shopData.headerIcon.length === 0) {
    result = false;
  } else if (shopData.logo.length === 0) {
    result = false;
  }
  else if (shopData.theme === "theme-2" && shopData.backgroundColor === '' ) {
    result = false;
  }
  else if (shopData.theme === "theme-3" && shopData.backgroundColor === '' ) {
    result = false;
  }
  
  return result;
};
