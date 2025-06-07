import { ArrowrightLg } from 'assets/icons/Navigation/ArrowRight/ArrowrightLg';
import { ExternalarrowLg } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowLg';

export const levelUpSections = [
  {
    title: 'Create first product',
    objectField: 'createFirstProduct',
    subSections: [
      {
        title: 'Physical Products',
        description: 'Add physical products by entering details like name, description, and price. Customers can browse and buy directly from your store.',
        link: { linkTitle: 'Learn more', linkTo: '/analytics' },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/215575e99677753f8ba8277f621ac9a36eda99e621cdd60b1b69d3d8ce11da4d.png',
        buttons: {
          right: {
            label: 'Next',
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: 'Digital Goods',
        description: 'Sell digital products like eBooks, software, or music. Upload files, set prices, and allow instant downloads after purchase.',
        link: { linkTitle: 'Learn more', linkTo: '/analytics' },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/59fe00a4b64ec51e04c4c0b80927ddd9e021d6aa2b418e26ba7ee19c0aad6796.png',
        buttons: {
          left: {
            label: 'Back',
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: 'Next',
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: 'Production-on-Demand Items',
        description: 'Offer customizable products like t-shirts or mugs that are produced only when ordered, handled by your print-on-demand partner.',
        link: {
          linkTitle: 'Learn more about it in our Help Center',
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/6fd973113f122e9941f93472b3487dbe21750dae58e2ad075d00880a9bf50913.png',
        buttons: {
          left: {
            label: 'Back',
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: 'Create Product',
            rightIcon: ExternalarrowLg,
            onClick: (setCurrentSubSection, onClose, navigate) => {
              if (onClose) onClose();
              if (navigate) navigate('/analytics/products');
            }
          }
        }
      }
    ]
  },
  {
    title: 'Customize shopfront',
    objectField: 'customizeShop',
    subSections: [
      {
        title: 'Customize Your Storefront Template',
        description: "Stand out by customizing your store's design. Select a template, adjust colors, fonts, and layout to match your brand.",
        image: 'https://upload-file-droplinked.s3.amazonaws.com/4c9b32fd20d246052ea848063380e6edbfba9bcda424d6de84a8b16427918ecc.png',
        buttons: {
          right: {
            label: 'Storefront Customization',
            rightIcon: ExternalarrowLg,
            onClick: (setCurrentSubSection, onClose, navigate) => {
              if (onClose) onClose();
              if (navigate) navigate('/style-center/storefront-designer');
            }
          }
        }
      }
    ]
  },
  {
    title: 'Join affiliate market',
    objectField: 'joinAffiliateMarket',
    subSections: [
      {
        title: 'Join the Affiliate Market',
        description: "Expand your reach by joining the affiliate market. Promote other stores' products for a commission or list your own for affiliates to sell.",
        image: 'https://upload-file-droplinked.s3.amazonaws.com/da9dbffc0e3a12de5ba1505f433b25204f8de0ed0b16684922caa3b5423ef7b1.png',
        buttons: {
          right: {
            label: 'Affiliate Market',
            rightIcon: ExternalarrowLg,
            onClick: (setCurrentSubSection, onClose, navigate) => {
              if (onClose) onClose();
              if (navigate) navigate('/analytics/affiliate/products');
            }
          }
        }
      }
    ]
  },
  {
    title: 'Sell first product',
    objectField: 'sellFirstProduct',
    subSections: [
      {
        title: 'Receive Your First Order',
        description: "Manage your store's activity and orders. From payment to delivery, we guide you through every step to help grow your business.",
        link: {
          linkTitle: 'Learn more about it in our Help Center',
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/717f254d430b3a819a0be97fd00283fb7e3a65b87ec55547c628eba427146fec.png',
        buttons: {
          right: {
            label: 'Next',
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: 'Product Link',
        description: 'Generate a payment link for any product, simplifying the checkout process and bypassing the storefront.',
        link: {
          linkTitle: 'Learn more about it in our Help Center',
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/93ddecbdb555b88368ba3bf31cb4facd30a625d87396faa5de271b6804437e4f.png',
        buttons: {
          left: {
            label: 'Back',
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: 'Next',
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: 'Product Tile',
        description: 'Create a customizable product tile for your website. Configure details and upload images to match your brand.',
        link: {
          linkTitle: 'Learn more about it in our Help Center',
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/1728952a3abf0b4a17346cd309ff18d97e9db470051e3b08f955135a5a27c675.png',
        buttons: {
          left: {
            label: 'Back',
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: 'Next',
            rightIcon: ArrowrightLg,
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev + 1)
          }
        }
      },
      {
        title: 'Social Tile', 
        description: 'Share products on Twitter with an embeddable tile that allows customers to view details and purchase directly.',
        link: {
          linkTitle: 'Learn more about it in our Help Center',
          linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
          isExternal: true
        },
        image: 'https://upload-file-droplinked.s3.amazonaws.com/36399de3948b9d88ccc7a455434e69c123a0f7e5494de763507e8d6532d1a5d5.png',
        buttons: {
          left: {
            label: 'Back',
            onClick: (setCurrentSubSection) => setCurrentSubSection((prev) => prev - 1)
          },
          right: {
            label: 'Create Product',
            rightIcon: ExternalarrowLg,
            onClick: (setCurrentSubSection, onClose, navigate) => {
              if (onClose) onClose();
              if (navigate) navigate('/analytics/style-center/product-tiles');
            }
          }
        }
      }
    ]
  }
];
