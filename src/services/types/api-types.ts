
import { z } from 'zod';

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////
export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const UserStatusSchema = z.enum([
  'NEW',
  'VERIFIED',
  'SHOP_INFO_COMPLETED',
  'BLOCKED',
  'PROFILE_COMPLETED',
  'IMS_TYPE_COMPLETED',
  'ACTIVE',
  'DELETED',
]);

export type UserStatusType = z.infer<typeof UserStatusSchema>;

export const UserTypeSchema = z.enum([
  'SHOPFRONT',
  'SHOPBUILDER',
  'ADMINISTRATOR',
]);

export type UserTypeType = z.infer<typeof UserTypeSchema>;

export const RegisterTypeSchema = z.enum(['NORMAL', 'WALLET', 'ADMIN']);

export type RegisterTypeType = z.infer<typeof RegisterTypeSchema>;

export const LoginMethodTypeSchema = z.enum(['WALLET', 'SOCIAL']);

export type LoginMethodTypeType = z.infer<typeof LoginMethodTypeSchema>;

export const SignupStatusSchema = z.enum(['COMPLETE', 'INCOMPLETE']);

export type SignupStatusType = z.infer<typeof SignupStatusSchema>;

export const InvitationStatusSchema = z.enum([
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'EXPIRED',
]);

export type InvitationStatusType = z.infer<typeof InvitationStatusSchema>;

export const DemoRequestStatusSchema = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
]);

export type DemoRequestStatusType = z.infer<
  typeof DemoRequestStatusSchema
>;

export const EnterpriseFeatureRequestStatusSchema = z.enum([
  'PENDING',
  'IN_PROGRESS',
  'CONTACTED',
  'RESOLVED',
  'DECLINED',
]);

export type EnterpriseFeatureRequestStatusType = z.infer<
  typeof EnterpriseFeatureRequestStatusSchema
>;

export const RoleStatusSchema = z.enum(['ADMIN']);

export type RoleStatusType = z.infer<typeof RoleStatusSchema>;

export const UserRoleSchema = z.enum([
  'QUEUE_SERVER',
  'PRODUCER',
  'ADMIN',
  'CUSTOMER',
  'SUPER_ADMIN',
]);

export type UserRoleType = z.infer<typeof UserRoleSchema>;

export const TokenTypeSchema = z.enum([
  'EMAIL_VERIFICATION',
  'FORGOT_PASSWORD_VERIFY',
  'CODE_VERIFICATION',
  'EMAIL_VERIFICATION_TOKEN',
  'EMAIL_VERIFICATION_CODE',
  'ACCOUNT_RECOVERY_TOKEN',
  'REFRESH_TOKEN',
]);

export type TokenTypeType = z.infer<typeof TokenTypeSchema>;

export const PRODUCT_TYPESchema = z.enum([
  'NORMAL',
  'PRINT_ON_DEMAND',
  'DIGITAL',
  'EVENT',
]);

export type PRODUCT_TYPEType = z.infer<typeof PRODUCT_TYPESchema>;

export const PRODUCT_PUBLISH_STATUSSchema = z.enum(['PUBLISHED', 'DRAFTED']);

export type PRODUCT_PUBLISH_STATUSType = z.infer<
  typeof PRODUCT_PUBLISH_STATUSSchema
>;

export const PRODUCT_PRINT_POSITIONSchema = z.enum([
  'back',
  'front',
  'BACK_CENTER',
  'FRONT_CENTER',
  'FRONT_LEFT_CHEST',
  'FRONT_RIGHT_CHEST',
  'LEFT_LEG_FRONT',
  'RIGHT_LEG_FRONT',
  'BACK_NECK',
]);

export type PRODUCT_PRINT_POSITIONType = z.infer<
  typeof PRODUCT_PRINT_POSITIONSchema
>;

export const VariantTypesSchema = z.enum(['COLOR', 'SIZE', 'CUSTOM']);

export type VariantTypesType = z.infer<typeof VariantTypesSchema>;

export const RecordStatusSchema = z.enum([
  'RECORDED',
  'PENDING',
  'NOT_RECORDED',
]);

export type RecordStatusType = z.infer<typeof RecordStatusSchema>;

export const RecordNetworkSchema = z.enum([
  'NONE',
  'ETHEREUM',
  'POLYGON',
  'BINANCE',
  'SOLANA',
  'CASPER',
  'STACKS',
  'RIPPLE',
]);

export type RecordNetworkType = z.infer<typeof RecordNetworkSchema>;

export const ChainsSchema = z.enum([
  'CASPER',
  'POLYGON',
  'BINANCE',
  'REDBELLY',
  'BITLAYER',
  'ETH',
  'STACKS',
  'XRPLSIDECHAIN',
  'NEAR',
  'SKALE',
  'BASE',
  'LINEA',
  'SOLANA',
]);

export type ChainsType = z.infer<typeof ChainsSchema>;

export const CryptoUsageScopesSchema = z.enum([
  'PAYMENT',
  'AUTH',
  'RECORD',
  'AFFILIATE',
  'RULESET',
  'M2M',
]);

export type CryptoUsageScopesType = z.infer<
  typeof CryptoUsageScopesSchema
>;

export const ChainGroupSchema = z.enum(['EVM', 'CASPER_BASED', 'SOLANA_BASED']);

export type ChainGroupType = z.infer<typeof ChainGroupSchema>;

export const NetworkCurrencySchema = z.enum([
  'NONE',
  'ETH',
  'MATIC',
  'BNB',
  'SOL',
  'CSPR',
  'STX',
  'XRP',
]);

export type NetworkCurrencyType = z.infer<typeof NetworkCurrencySchema>;

export const RuleSetTypeSchema = z.enum(['DISCOUNT', 'GATING']);

export type RuleSetTypeType = z.infer<typeof RuleSetTypeSchema>;

export const BlockchainTypeSchema = z.enum(['NFT', 'TOKEN']);

export type BlockchainTypeType = z.infer<typeof BlockchainTypeSchema>;

export const NETWORKSchema = z.enum([
  'ETH',
  'POLYGON',
  'BSC',
  'SOLANA',
  'CASPER',
  'STACKS',
  'RIPPLE',
]);

export type NETWORKType = z.infer<typeof NETWORKSchema>;

export const VasNameSchema = z.enum([
  'TAX',
  'SHIPPING',
  'DROPLINKED_FEE',
  'AFFILIATE',
  'PRODUCTION',
]);

export type VasNameType = z.infer<typeof VasNameSchema>;

export const SkuVasNameSchema = z.enum(['AFFILIATE', 'PRODUCTION']);

export type SkuVasNameType = z.infer<typeof SkuVasNameSchema>;

export const VasCostTypeSchema = z.enum(['USD', 'PERCENT']);

export type VasCostTypeType = z.infer<typeof VasCostTypeSchema>;

export const VasTypeSchema = z.enum([
  'VAT',
  'DROPLINKED',
  'AFFILIATE',
  'CUSTOM',
  'EASY_POST',
  'PRINTFUL',
  'NONE',
]);

export type VasTypeType = z.infer<typeof VasTypeSchema>;

export const VasValueSchema = z.enum(['TBD']);

export type VasValueType = z.infer<typeof VasValueSchema>;

export const VasReceiverSchema = z.enum([
  'DROPLINKED',
  'PRODUCER',
  'AFFILIATOR',
]);

export type VasReceiverType = z.infer<typeof VasReceiverSchema>;

export const COLLECTION_TYPESchema = z.enum([
  'DEFAULT_PUBLIC',
  'PUBLIC',
  'HOLDER',
]);

export type COLLECTION_TYPEType = z.infer<typeof COLLECTION_TYPESchema>;

export const USER_IMSTYPESchema = z.enum(['DROPLINKED', 'PRINTFUL', 'CUSTOM']);

export type USER_IMSTYPEType = z.infer<typeof USER_IMSTYPESchema>;

export const DeployContractPlatformSchema = z.enum([
  'DROPLINKED',
  'EVENT',
  'CROSSMINT',
]);

export type DeployContractPlatformType = z.infer<
  typeof DeployContractPlatformSchema
>;

export const DeployContractStatusSchema = z.enum([
  'PENDING',
  'SUCCESS',
  'FAILED',
]);

export type DeployContractStatusType = z.infer<
  typeof DeployContractStatusSchema
>;

export const CreditTypeSchema = z.enum(['INTERNAL', 'REFUND']);

export type CreditTypeType = z.infer<typeof CreditTypeSchema>;

export const CreditTransactionStatusSchema = z.enum([
  'PENDING',
  'SUCCESS',
  'TIMEDOUT',
  'FAILED',
]);

export type CreditTransactionStatusType = z.infer<
  typeof CreditTransactionStatusSchema
>;

export const CreditTransactionCategorySchema = z.enum([
  'ORDER',
  'CREDIT_BALANCE',
  'AFFILIATE_SHARE',
  'SUBSCRIPTION_UPDATE',
  'GAMIFICATION_REWARD',
  'WITHDRAW',
  'REFERRAL',
  'CUSTOMER_SUPPORT_FEE',
  'BULK_ORDER',
  'MANUAL_CREDIT_ADJUSTMENT',
  'SUBSCRIPTION_RENEWAL',
  'WITHDRAW_CIRCLE',
  'REFERRAL_INCOME',
]);

export type CreditTransactionCategoryType = z.infer<
  typeof CreditTransactionCategorySchema
>;

export const ShopCreditAmountTypeSchema = z.enum(['INCREASE', 'DECREASE']);

export type ShopCreditAmountTypeType = z.infer<
  typeof ShopCreditAmountTypeSchema
>;

export const WithdrawTypeSchema = z.enum([
  'CIRCLE_SELF_WALLET',
  'CIRCLE_SHOP_CREDIT',
]);

export type WithdrawTypeType = z.infer<typeof WithdrawTypeSchema>;

export const CrawlingTaskStatusSchema = z.enum([
  'PENDING',
  'EXTRACTING_SHOP_INFO',
  'SHOP_INFO_EXTRACTED',
  'PROCESSING_PREVIEW',
  'PREVIEWS_READY',
  'PRODUCTS_SELECTED',
  'CRAWLING',
  'COMPLETED',
  'RECORDING',
  'RECORDED',
  'ERROR',
]);

export type CrawlingTaskStatusType = z.infer<
  typeof CrawlingTaskStatusSchema
>;

export const CrawlingTaskTypeSchema = z.enum([
  'CRAWL_WEBSITE',
  'CRAWL_PRODUCTS',
]);

export type CrawlingTaskTypeType = z.infer<typeof CrawlingTaskTypeSchema>;

export const RecordingStatusSchema = z.enum([
  'NOT_STARTED',
  'RECORDING',
  'RECORDED',
  'FAILED',
]);

export type RecordingStatusType = z.infer<typeof RecordingStatusSchema>;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  status: UserStatusSchema,
  type: UserTypeSchema,
  registerType: RegisterTypeSchema,
  id: z.string(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  email: z.string().nullable(),
  customerShop: z.string(),
  sessionValidationKey: z.string().nullable(),
  password: z.string().nullable(),
  avatar: z.string().nullable(),
  phone: z.string().nullable(),
  stacksAddress: z.string().nullable(),
  ETHAddress: z.string().nullable(),
  casperAddress: z.string().nullable(),
  skaleAddress: z.string().nullable(),
  unstoppableDomainAddress: z.string().nullable(),
  hederaAddress: z.string().nullable(),
  unisatAddress: z.string().nullable(),
  polygonAddress: z.string().nullable(),
  binanceAddress: z.string().nullable(),
  redbellyAddress: z.string().nullable(),
  bitlayerAddress: z.string().nullable(),
  lineaAddress: z.string().nullable(),
  baseAddress: z.string().nullable(),
  nearAddress: z.string().nullable(),
  rippleAddress: z.string().nullable(),
  xrplSidechainAddress: z.string().nullable(),
  xummAddress: z.string().nullable(),
  xverseAddress: z.string().nullable(),
  solanaAddress: z.string().nullable(),
  /**
   * ![({ type: string; address: string; public_key?: string }[]) | undefined]
   */
  wallets: z
    .object({
      type: z.string(),
      address: z.string(),
      public_key: z.string().nullable(),
    })
    .array()
    .nullable(),
  stripeCustomerID: z.string().nullable(),
  emailNotificationEnabled: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// D 3 USER SCHEMA
/////////////////////////////////////////

export const D3UserSchema = z.object({
  signupStatus: SignupStatusSchema.nullable(),
  id: z.string(),
  walletAddress: z.string(),
  walletType: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type D3User = z.infer<typeof D3UserSchema>;

/////////////////////////////////////////
// UD USER SCHEMA
/////////////////////////////////////////

export const UDUserSchema = z.object({
  signupStatus: SignupStatusSchema.nullable(),
  id: z.string(),
  walletAddress: z.string(),
  walletType: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UDUser = z.infer<typeof UDUserSchema>;

/////////////////////////////////////////
// UD SIGNUPS SCHEMA
/////////////////////////////////////////

export const UDSignupsSchema = z.object({
  id: z.string(),
  domain: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UDSignups = z.infer<typeof UDSignupsSchema>;

/////////////////////////////////////////
// LOGIN METHODS SCHEMA
/////////////////////////////////////////

export const LoginMethodsSchema = z.object({
  type: LoginMethodTypeSchema,
  id: z.string(),
  name: z.string(),
  isActivated: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type LoginMethods = z.infer<typeof LoginMethodsSchema>;

/////////////////////////////////////////
// LOGIN NONCES SCHEMA
/////////////////////////////////////////

export const LoginNoncesSchema = z.object({
  id: z.string(),
  wallet: z.string(),
  nonce: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type LoginNonces = z.infer<typeof LoginNoncesSchema>;

/////////////////////////////////////////
// LANDING USER SCHEMA
/////////////////////////////////////////

export const LandingUserSchema = z.object({
  id: z.string(),
  feature: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type LandingUser = z.infer<typeof LandingUserSchema>;

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  role: UserRoleSchema,
  id: z.string(),
  userId: z.string(),
  shopId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Role = z.infer<typeof RoleSchema>;

/////////////////////////////////////////
// INVITATION SCHEMA
/////////////////////////////////////////

export const InvitationSchema = z.object({
  status: InvitationStatusSchema,
  role: RoleStatusSchema,
  id: z.string(),
  recipientEmail: z.string(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  senderId: z.string(),
  storeId: z.string(),
});

export type Invitation = z.infer<typeof InvitationSchema>;

/////////////////////////////////////////
// AUTH TOKEN SCHEMA
/////////////////////////////////////////

export const AuthTokenSchema = z.object({
  type: TokenTypeSchema,
  id: z.string(),
  email: z.string().nullable(),
  token: z.string().cuid(),
  expiresAt: z.coerce.date(),
  expired: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;

/////////////////////////////////////////
// SHOP SCHEMA
/////////////////////////////////////////

export const ShopSchema = z.object({
  id: z.string(),
  name: z.string(),
  privateKey: z.string(),
  logo: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ownerID: z.string(),
});

export type Shop = z.infer<typeof ShopSchema>;

/////////////////////////////////////////
// PRODUCT V 2 SCHEMA
/////////////////////////////////////////

export const ProductV2Schema = z.object({
  type: USER_IMSTYPESchema,
  product_type: PRODUCT_TYPESchema,
  artwork_position: PRODUCT_PRINT_POSITIONSchema.nullable(),
  artwork2_position: PRODUCT_PRINT_POSITIONSchema.nullable(),
  publish_status: PRODUCT_PUBLISH_STATUSSchema,
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  artwork: z.string().nullable(),
  artwork2: z.string().nullable(),
  priceUnit: z.string().nullable(),
  shippingType: z.string().nullable(),
  shippingPrice: z.number().nullable(),
  thumb: z.string().nullable(),
  purchaseAvailable: z.boolean().nullable(),
  /**
   * ![number | string]
   */
  printful_template_id: z.any().nullable(),
  custome_external_id: z.string().nullable(),
  tags: z.string().array(),
  isAddToCartDisabled: z.boolean().nullable(),
  isTemplate: z.boolean().nullable(),
  order: z.number().int().nullable(),
  slug: z.string(),
  sampleHTML: z.string().nullable(),
  launchDate: z.coerce.date().nullable(),
  canBeAffiliated: z.boolean().nullable(),
  commission: z.number().nullable(),
  publicLink: z.string().nullable(),
  isArchived: z.boolean(),
  vector: z.number().array(),
  pod_blank_product_id: z.string().nullable(),
  /**
   * ![ProductsM2MPositions[] | undefined]
   */
  m2m_positions_options: z.custom<ProductsM2MPositions[]>().nullable(),
  /**
   * ![({id: string, value: string | string[]})[] | undefined]
   */
  printful_option_data: z
    .object({
      id: z.string(),
      value: z.string().or(z.string().array()),
    })
    .array()
    .nullable(),
  /**
   * ![ProductsM2MPositions[] | undefined]
   */
  m2m_positions: z.custom<ProductsM2MPositions[]>().nullable(),
  /**
   * ![{message?: string; file_url?: string; chain?: Chains}]
   */
  digitalDetail: z
    .object({
      message: z.string().nullable(),
      file_url: z.string().nullable(),
      chain: z.string().nullable(),
    })
    .nullable(),
  /**
   * ![{ name: string; color: string }]
   */
  udFontOption: z
    .object({
      name: z.string(),
      color: z.string(),
    })
    .nullable(),
  technique: z.string().nullable(),
  /**
   * ![{ active: boolean; title: string } | boolean]
   */
  pre_purchase_data_fetch: z
    .object({
      message: z.string().nullable(),
      file_url: z.string().nullable(),
      chain: z.string().nullable(),
    })
    .nullable(),
  /**
   * ![{deployHash: string; transactionUrl: string; networkName: string}]
   */
  nftData: z
    .object({
      deployHash: z.string(),
      transactionUrl: z.string(),
      networkName: z.string(),
    })
    .nullable(),
  lowestPrice: z.number().nullable(),
  highestPrice: z.number().nullable(),
  totalSoldUnits: z.number().int().nullable(),
  collectionId: z.string().nullable(),
  m2mServiceIds: z.string().array(),
  shopId: z.string(),
  mainCategory: z.string().nullable(),
  subCategories: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ProductV2 = z.infer<typeof ProductV2Schema>;

/////////////////////////////////////////
// PRODUCT CATEGORY SCHEMA
/////////////////////////////////////////

export const ProductCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
});

export type ProductCategory = z.infer<typeof ProductCategorySchema>;

/////////////////////////////////////////
// PRODUCT SUB CATEGORY SCHEMA
/////////////////////////////////////////

export const ProductSubCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  productCategory: z.string(),
});

export type ProductSubCategory = z.infer<typeof ProductSubCategorySchema>;

/////////////////////////////////////////
// PRODUCT TILE V 2 SCHEMA
/////////////////////////////////////////

export const ProductTileV2Schema = z.object({
  id: z.string(),
  embedded_tag: z.string(),
  productId: z.string(),
});

export type ProductTileV2 = z.infer<typeof ProductTileV2Schema>;

/////////////////////////////////////////
// PRODUCT TILE FILE SCHEMA
/////////////////////////////////////////

export const ProductTileFileSchema = z.object({
  id: z.string(),
  css: z.string(),
  js: z.string(),
});

export type ProductTileFile = z.infer<typeof ProductTileFileSchema>;

/////////////////////////////////////////
// M 2 M SERVICE V 2 SCHEMA
/////////////////////////////////////////

export const M2MServiceV2Schema = z.object({
  id: z.string(),
  name: z.string(),
  chain: z.string(),
  productIds: z.string().array(),
});

export type M2MServiceV2 = z.infer<typeof M2MServiceV2Schema>;

/////////////////////////////////////////
// COLLECTION V 2 SCHEMA
/////////////////////////////////////////

export const CollectionV2Schema = z.object({
  type: COLLECTION_TYPESchema,
  id: z.string(),
  title: z.string(),
  image: z.string().nullable(),
  description: z.string().nullable(),
  published: z.boolean(),
  order: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  shopId: z.string(),
  ruleSetID: z.string().nullable(),
  productsCount: z.number().int(),
});

export type CollectionV2 = z.infer<typeof CollectionV2Schema>;

/////////////////////////////////////////
// RULE SET V 2 SCHEMA
/////////////////////////////////////////

export const RuleSetV2Schema = z.object({
  type: RuleSetTypeSchema,
  network: NETWORKSchema,
  blockchainType: BlockchainTypeSchema,
  id: z.string(),
  discountPercentage: z.number().nullable(),
  nftPurchaseLink: z.string().nullable(),
  nftContractAddresses: z.string().array(),
  minimumNftRequired: z.number().int(),
  description: z.string().nullable(),
  /**
   * ![string[]]
   */
  passedNftDetails: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ownerID: z.string(),
  shopId: z.string(),
  collectionID: z.string(),
});

export type RuleSetV2 = z.infer<typeof RuleSetV2Schema>;

/////////////////////////////////////////
// CHAIN SCHEMA
/////////////////////////////////////////

export const ChainSchema = z.object({
  type: ChainsSchema,
  group: ChainGroupSchema,
  id: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  isActive: z.boolean(),
  editable: z.boolean(),
  /**
   * ![{type: CryptoUsageScopes, isActive: boolean}]
   */
  scopes: z
    .object({
      type: CryptoUsageScopesSchema,
      isActive: z.boolean(),
    })
    .array(),
});

export type Chain = z.infer<typeof ChainSchema>;

/////////////////////////////////////////
// DEMO REQUEST SCHEMA
/////////////////////////////////////////

export const DemoRequestSchema = z.object({
  status: DemoRequestStatusSchema,
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  message: z.string().nullable(),
  organizationSize: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type DemoRequest = z.infer<typeof DemoRequestSchema>;

/////////////////////////////////////////
// ENTERPRISE FEATURE REQUEST SCHEMA
/////////////////////////////////////////

export const EnterpriseFeatureRequestSchema = z.object({
  status: EnterpriseFeatureRequestStatusSchema,
  id: z.string(),
  primaryGoal: z.string(),
  organizationSize: z.string(),
  featureDescription: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
});

export type EnterpriseFeatureRequest = z.infer<
  typeof EnterpriseFeatureRequestSchema
>;

/////////////////////////////////////////
// CREDIT SCHEMA
/////////////////////////////////////////

export const CreditSchema = z.object({
  creditType: CreditTypeSchema,
  id: z.string(),
  shopId: z.string(),
  amount: z.number(),
  updatedAt: z.coerce.date(),
});

export type Credit = z.infer<typeof CreditSchema>;

/////////////////////////////////////////
// CREDIT HISTORY SCHEMA
/////////////////////////////////////////

export const CreditHistorySchema = z.object({
  creditType: CreditTypeSchema,
  amountType: ShopCreditAmountTypeSchema,
  transactionType: CreditTransactionCategorySchema,
  status: CreditTransactionStatusSchema,
  withdrawType: WithdrawTypeSchema.nullable(),
  id: z.string(),
  shopId: z.string(),
  previousAmount: z.number(),
  amount: z.number(),
  newAmount: z.number(),
  additionalInfo: z.any().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CreditHistory = z.infer<typeof CreditHistorySchema>;

/////////////////////////////////////////
// SKU V 2 SCHEMA
/////////////////////////////////////////

export const SkuV2Schema = z.object({
  id: z.string(),
  shopId: z.string(),
  productId: z.string(),
  externalID: z.string().nullable(),
  price: z.number(),
  rawPrice: z.number().nullable(),
  commision: z.number(),
  quantity: z.number().int(),
  sold_units: z.number().int(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  /**
   * ![{status: string, deployHash: string, transactionUrl: string, networkName: string, commision: number, royalty: number}]
   */
  recordData: z
    .object({
      status: z.string(),
      deployHash: z.string(),
      transactionUrl: z.string(),
      networkName: z.string(),
      commision: z.number(),
      royalty: z.number(),
    })
    .nullable(),
  /**
   * ![{variantName: string, value: string, caption: string}]
   */
  options: z
    .object({
      variantName: z.string(),
      value: z.string(),
      caption: z.string(),
    })
    .array(),
});

export type SkuV2 = z.infer<typeof SkuV2Schema>;

/////////////////////////////////////////
// COMPOSITE TYPES
/////////////////////////////////////////
// VAS TEMPLATE
//------------------------------------------------------

/////////////////////////////////////////
// VAS TEMPLATE SCHEMA
/////////////////////////////////////////

export const VasTemplateSchema = z.object({
  name: VasNameSchema,
  costType: VasCostTypeSchema,
  receiver: VasReceiverSchema,
  /**
   * ![VasType | string]
   */
  type: VasTypeSchema.or(z.string()),
  /**
   * ![number | "TBD"]
   */
  value: z.number().or(z.string()),
});

export type VasTemplate = z.infer<typeof VasTemplateSchema>;
// PRODUCTS M 2 M POSITIONS
//------------------------------------------------------

/////////////////////////////////////////
// PRODUCTS M 2 M POSITIONS SCHEMA
/////////////////////////////////////////

export const ProductsM2MPositionsSchema = z.object({
  variant_ids: z.number().int().array(),
  placement: z.string(),
  url: z.string(),
  /**
   * ![{id: string, value: string | string[]} | undefined]
   */
  options: z
    .object({
      id: z.string(),
      value: z.string().or(z.string().array()),
    })
    .array(),
  /**
   * ![{area_height: number, area_width: number, height: number, left: number, placement: string, placemnet: string, rotation: number, top: number, width: number}]
   */
  position: z
    .object({
      area_height: z.number(),
      area_width: z.number(),
      height: z.number(),
      left: z.number(),
      placement: z.string(),
    })
    .nullable(),
});

export type ProductsM2MPositions = z.infer<typeof ProductsM2MPositionsSchema>;
// PRODUCT TILE STYLE
//------------------------------------------------------

/////////////////////////////////////////
// PRODUCT TILE STYLE SCHEMA
/////////////////////////////////////////

export const ProductTileStyleSchema = z.object({
  /**
   * ![{CONTAINER: {type: string, backgroundColor: string, opacity: number, darkMode: boolean, description: boolean, phone: boolean, buttonBackgroundColor: string, text: string, color: string}, IMAGE: {display: boolean, slider: boolean}, TITLE: {color: string}, PRICE: {color: string}, VARIANTS: {displayType: string}, BUTTON: {text: string, backgroundColor: string, color: string}}]
   */
  PRODUCT: z.any(),
});

export type ProductTileStyle = z.infer<typeof ProductTileStyleSchema>;
// MEDIA
//------------------------------------------------------

/////////////////////////////////////////
// MEDIA SCHEMA
/////////////////////////////////////////

export const MediaSchema = z.object({
  url: z.string(),
  /**
   * ![boolean | string]
   */
  isMain: z.boolean().or(z.string()).nullable(),
  thumbnail: z.string().nullable(),
});

export type Media = z.infer<typeof MediaSchema>;
// DIMENSION
//------------------------------------------------------

/////////////////////////////////////////
// DIMENSION SCHEMA
/////////////////////////////////////////

export const DimensionSchema = z.object({
  length: z.number(),
  width: z.number(),
  height: z.number(),
});

export type Dimension = z.infer<typeof DimensionSchema>;
// DIMENSION V 2
//------------------------------------------------------

/////////////////////////////////////////
// DIMENSION V 2 SCHEMA
/////////////////////////////////////////

export const DimensionV2Schema = z.object({
  length: z.number(),
  width: z.number(),
  height: z.number(),
  weight: z.number(),
});

export type DimensionV2 = z.infer<typeof DimensionV2Schema>;
// RECORD DATA DETAILS
//------------------------------------------------------

/////////////////////////////////////////
// RECORD DATA DETAILS SCHEMA
/////////////////////////////////////////

export const RecordDataDetailsSchema = z.object({
  productId: z.string(),
  amount: z.string(),
  owner: z.string(),
  uri: z.string(),
});

export type RecordDataDetails = z.infer<typeof RecordDataDetailsSchema>;
// RECORD DATA
//------------------------------------------------------

/////////////////////////////////////////
// RECORD DATA SCHEMA
/////////////////////////////////////////

export const RecordDataSchema = z.object({
  event_type: z.string(),
});

export type RecordData = z.infer<typeof RecordDataSchema>;
// RECORD
//------------------------------------------------------

/////////////////////////////////////////
// RECORD SCHEMA
/////////////////////////////////////////

export const RecordSchema = z.object({
  status: RecordStatusSchema,
  recordNetwork: RecordNetworkSchema,
  currency: NetworkCurrencySchema,
  commision: z.number(),
});

export type Record = z.infer<typeof RecordSchema>;
// SHOP DEPLOYED CONTRACT
//------------------------------------------------------

/////////////////////////////////////////
// SHOP DEPLOYED CONTRACT SCHEMA
/////////////////////////////////////////

export const ShopDeployedContractSchema = z.object({
  status: DeployContractStatusSchema,
  platform: DeployContractPlatformSchema,
  type: z.string(),
  transaction_id: z.string(),
  deployedShopAddress: z.string(),
  deployedNFTAddress: z.string(),
  verified: z.boolean(),
  isCircle: z.boolean(),
  chainId: z.string(),
});

export type ShopDeployedContract = z.infer<typeof ShopDeployedContractSchema>;
// CURRENCY
//------------------------------------------------------

/////////////////////////////////////////
// CURRENCY SCHEMA
/////////////////////////////////////////

export const CurrencySchema = z.object({
  abbreviation: z.string(),
  symbol: z.string(),
  conversionRateToUSD: z.number(),
});

export type Currency = z.infer<typeof CurrencySchema>;
    