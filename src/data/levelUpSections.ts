import { ArrowrightLg } from 'assets/icons/Navigation/ArrowRight/ArrowrightLg';
import { ExternalarrowLg } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowLg';
import { TFunction } from 'i18next';

export const getLevelUpSections = (t: TFunction) => [
  {
    title: t('sections.createFirstProduct.title'),
    objectField: 'createFirstProduct',
    subSections: [
      {
        title: t('sections.createFirstProduct.physical.title'),
        description: t('sections.createFirstProduct.physical.description'),
        link: { linkTitle: t('common.learnMore'), linkTo: '/analytics' },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/215575e99677753f8ba8277f621ac9a36eda99e621cdd60b1b69d3d8ce11da4d.png',
        buttons: {
          right: {
            label: t('common.next'),
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: t('sections.createFirstProduct.digital.title'),
        description: t('sections.createFirstProduct.digital.description'),
        link: { linkTitle: t('common.learnMore'), linkTo: '/analytics' },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/59fe00a4b64ec51e04c4c0b80927ddd9e021d6aa2b418e26ba7ee19c0aad6796.png',
        buttons: {
          left: {
            label: t('common.back'),
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: t('common.next'),
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: t('sections.createFirstProduct.onDemand.title'),
        description: t('sections.createFirstProduct.onDemand.description'),
        link: {
          linkTitle: t('common.learnMoreHelpCenter'),
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/6fd973113f122e9941f93472b3487dbe21750dae58e2ad075d00880a9bf50913.png',
        buttons: {
          left: {
            label: t('common.back'),
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: t('common.createProduct'),
            rightIcon: ExternalarrowLg,
            onClick: (setCurrentSubSection, onClose, navigate) => {
              onClose?.()
              navigate?.('/analytics/products')
            }
          }
        }
      }
    ]
  },
  {
    title: t('sections.customizeShop.title'),
    objectField: 'customizeShop',
    subSections: [
      {
        title: t('sections.customizeShop.storefront.title'),
        description: t('sections.customizeShop.storefront.description'),
        image: 'https://upload-file-droplinked.s3.amazonaws.com/4c9b32fd20d246052ea848063380e6edbfba9bcda424d6de84a8b16427918ecc.png',
        buttons: {
          right: {
            label: t('common.storefrontCustomization'),
            rightIcon: ExternalarrowLg,
            onClick: (setCurrentSubSection, onClose, navigate) => {
              onClose?.()
              navigate?.('/style-center/storefront-designer')
            }
          }
        }
      }
    ]
  },
  {
    title: t('sections.joinAffiliateMarket.title'),
    objectField: 'joinAffiliateMarket',
    subSections: [
      {
        title: t('sections.joinAffiliateMarket.main.title'),
        description: t('sections.joinAffiliateMarket.main.description'),
        image: 'https://upload-file-droplinked.s3.amazonaws.com/da9dbffc0e3a12de5ba1505f433b25204f8de0ed0b16684922caa3b5423ef7b1.png',
        buttons: {
          right: {
            label: t('common.affiliateMarket'),
            rightIcon: ExternalarrowLg,
            onClick: (setCurrentSubSection, onClose, navigate) => {
              onClose?.()
              navigate?.('/analytics/affiliate/products')
            }
          }
        }
      }
    ]
  },
  {
    title: t('sections.sellFirstProduct.title'),
    objectField: 'sellFirstProduct',
    subSections: [
      {
        title: t('sections.sellFirstProduct.firstOrder.title'),
        description: t('sections.sellFirstProduct.firstOrder.description'),
        link: {
          linkTitle: t('common.learnMoreHelpCenter'),
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/717f254d430b3a819a0be97fd00283fb7e3a65b87ec55547c628eba427146fec.png',
        buttons: {
          right: {
            label: t('common.next'),
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: t('sections.sellFirstProduct.productLink.title'),
        description: t('sections.sellFirstProduct.productLink.description'),
        link: {
          linkTitle: t('common.learnMoreHelpCenter'),
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/93ddecbdb555b88368ba3bf31cb4facd30a625d87396faa5de271b6804437e4f.png',
        buttons: {
          left: {
            label: t('common.back'),
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: t('common.next'),
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: t('sections.sellFirstProduct.productTile.title'),
        description: t('sections.sellFirstProduct.productTile.description'),
        link: {
          linkTitle: t('common.learnMoreHelpCenter'),
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/1728952a3abf0b4a17346cd309ff18d97e9db470051e3b08f955135a5a27c675.png',
        buttons: {
          left: {
            label: t('common.back'),
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: t('common.next'),
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: t('sections.sellFirstProduct.socialTile.title'),
        description: t('sections.sellFirstProduct.socialTile.description'),
        link: {
          linkTitle: t('common.learnMoreHelpCenter'),
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/36399de3948b9d88ccc7a455434e69c123a0f7e5494de763507e8d6532d1a5d5.png',
        buttons: {
          left: {
            label: t('common.back'),
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: t('common.createProduct'),
            rightIcon: ExternalarrowLg,
            onClick: (setCurrentSubSection, onClose, navigate) => {
              onClose?.()
              navigate?.('/analytics/style-center/product-tiles')
            }
          }
        }
      }
    ]
  }
]