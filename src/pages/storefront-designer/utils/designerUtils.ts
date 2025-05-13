import { initialStateDesignPage } from '../constants/initialState';
import { AdditionalLinks, ShopDesignPage } from '../types/designerTypes';
export class DesignerModelUtils {
  /**
   * Transforms additional links data into a standardized format
   * @param data Array of additional links
   * @returns Formatted array of links with save property
   */
  static refactorAdditionalLinks(data: Array<AdditionalLinks>): Array<AdditionalLinks> {
    return data.map((el) => ({
      caption: el.caption,
      link: el.link,
      save: true
    }));
  }

  /**
   * Transforms raw shop data into a standardized shop design page model
   * @param shop Raw shop data from API or other sources
   * @returns Formatted shop design page data
   */
  static refactorData(shop: any): ShopDesignPage {
    if (!shop) return initialStateDesignPage.shop as ShopDesignPage;

    return {
      backgroundColor: shop?.backgroundColor || initialStateDesignPage.shop?.backgroundColor,
      backgroundImage: shop?.backgroundImage || initialStateDesignPage.shop?.backgroundImage,
      backgroundImageSecondary: shop?.backgroundImageSecondary || initialStateDesignPage.shop?.backgroundImageSecondary,
      backgroundText: shop?.backgroundText || initialStateDesignPage.shop?.backgroundText,
      discordURL: shop?.discordURL || initialStateDesignPage.shop?.discordURL,
      facebookURL: shop?.facebookURL || initialStateDesignPage.shop?.facebookURL,
      fullWidthHero: shop?.fullWidthHero || initialStateDesignPage.shop?.fullWidthHero,
      headerIcon: shop?.headerIcon || initialStateDesignPage.shop?.headerIcon,
      instagramURL: shop?.instagramURL || initialStateDesignPage.shop?.instagramURL,
      linkedinURL: shop?.linkedinURL || initialStateDesignPage.shop?.linkedinURL,
      logo: shop?.logo || initialStateDesignPage.shop?.logo,
      productSectionText: shop?.productSectionText || initialStateDesignPage.shop?.productSectionText,
      shopDesign: {
        fontfamily: shop?.shopDesign?.fontfamily || initialStateDesignPage.shop?.shopDesign?.fontfamily,
        headerBackground: shop?.shopDesign?.headerBackground || initialStateDesignPage.shop?.shopDesign?.headerBackground,
        isHeaderFixed: shop?.shopDesign?.isHeaderFixed || initialStateDesignPage.shop?.shopDesign?.isHeaderFixed,
        hiroLayout: shop?.shopDesign?.hiroLayout || initialStateDesignPage.shop?.shopDesign?.hiroLayout,
        hiroTextColor: shop?.shopDesign?.hiroTextColor || initialStateDesignPage.shop?.shopDesign?.hiroTextColor,
        productListTitle: shop?.shopDesign?.productListTitle || initialStateDesignPage.shop?.shopDesign?.productListTitle,
        backgroundBody: shop?.shopDesign?.backgroundBody || initialStateDesignPage.shop?.shopDesign?.backgroundBody,
        foreground: shop?.shopDesign?.foreground || initialStateDesignPage.shop?.shopDesign?.foreground,
        textColorParagraphs: shop?.shopDesign?.textColorParagraphs || initialStateDesignPage.shop?.shopDesign?.textColorParagraphs,
        iconHeaderColor: shop?.shopDesign?.iconHeaderColor || initialStateDesignPage.shop?.shopDesign?.iconHeaderColor,
        footerLinks:
          shop?.shopDesign?.footerLinks && typeof shop?.shopDesign?.footerLinks === 'object'
            ? DesignerModelUtils.refactorAdditionalLinks(shop?.shopDesign?.footerLinks)
            : initialStateDesignPage.shop?.shopDesign?.footerLinks,
        bannerLinks:
          shop?.shopDesign?.bannerLinks && typeof shop?.shopDesign?.bannerLinks === 'object'
            ? DesignerModelUtils.refactorAdditionalLinks(shop?.shopDesign?.bannerLinks)
            : initialStateDesignPage.shop?.shopDesign?.bannerLinks,
        isCollectionShown: shop?.shopDesign?.isCollectionShown || initialStateDesignPage.shop?.shopDesign?.isCollectionShown,
        isLogoAsFavicon: shop?.shopDesign?.isLogoAsFavicon || initialStateDesignPage.shop?.shopDesign?.isLogoAsFavicon,
        faviconURL: shop?.shopDesign?.faviconURL || initialStateDesignPage.shop?.shopDesign?.faviconURL
      },
      templateID: shop?.templateID || initialStateDesignPage.shop?.templateID,
      tiktokURL: shop?.tiktokURL || initialStateDesignPage.shop?.tiktokURL,
      twitterURL: shop?.twitterURL || initialStateDesignPage.shop?.twitterURL,
      webURL: shop?.webURL || initialStateDesignPage.shop?.webURL,
      telegramURL: shop?.telegramURL || initialStateDesignPage.shop?.telegramURL,
      youtubeURL: shop?.youtubeURL || initialStateDesignPage.shop?.youtubeURL,
      messengerURL: shop?.messengerURL || initialStateDesignPage.shop?.messengerURL,
      template_options: shop?.template_options || initialStateDesignPage.shop?.template_options,
      launchDate: shop?.launchDate || initialStateDesignPage.shop?.launchDate
    };
  }
}