/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/droplinked_solana_program.json`.
 */
export type DroplinkedSolanaProgram = {
  "address": "3vvPxPKucHcfPL1CGd1nVgsPbXxpe3ue6tJSaczqi1FL",
  "metadata": {
    "name": "droplinkedSolanaProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createCommissionableProduct",
      "discriminator": [
        81,
        32,
        220,
        236,
        185,
        40,
        91,
        139
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "commissionableProduct",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "productMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "account",
                "path": "commissionableProduct"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        }
      ],
      "args": [
        {
          "name": "shopNonce",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "productNonce",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "variant",
          "type": {
            "defined": {
              "name": "productVariant"
            }
          }
        },
        {
          "name": "price",
          "type": {
            "defined": {
              "name": "productPrice"
            }
          }
        },
        {
          "name": "commission",
          "type": "u16"
        },
        {
          "name": "publishers",
          "type": {
            "vec": "pubkey"
          }
        },
        {
          "name": "information",
          "type": {
            "defined": {
              "name": "productInformation"
            }
          }
        }
      ]
    },
    {
      "name": "createShop",
      "discriminator": [
        83,
        215,
        157,
        151,
        185,
        162,
        84,
        154
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "shop",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "shopNonce",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "metadata",
          "type": "string"
        }
      ]
    },
    {
      "name": "createStandardProduct",
      "discriminator": [
        15,
        173,
        223,
        52,
        20,
        31,
        88,
        194
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "standardProduct",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "productMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "account",
                "path": "standardProduct"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        }
      ],
      "args": [
        {
          "name": "shopNonce",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "productNonce",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "variant",
          "type": {
            "defined": {
              "name": "productVariant"
            }
          }
        },
        {
          "name": "price",
          "type": {
            "defined": {
              "name": "productPrice"
            }
          }
        },
        {
          "name": "information",
          "type": {
            "defined": {
              "name": "productInformation"
            }
          }
        }
      ]
    },
    {
      "name": "purchaseCommissionableProductSol",
      "discriminator": [
        184,
        31,
        164,
        53,
        218,
        213,
        234,
        87
      ],
      "accounts": [
        {
          "name": "purchaser",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true
        },
        {
          "name": "publisher",
          "writable": true,
          "optional": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "commissionableProduct",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "productMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "account",
                "path": "commissionableProduct"
              }
            ]
          }
        },
        {
          "name": "productDestination",
          "writable": true
        },
        {
          "name": "droplinked",
          "writable": true,
          "address": "4QJUPa4yudpPB7joCk53Q9uy6RX1c6ARYDnbZnqtowUD"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "purchaseCommissionableProductSpl",
      "discriminator": [
        228,
        119,
        51,
        68,
        249,
        47,
        59,
        231
      ],
      "accounts": [
        {
          "name": "purchaser",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "commissionableProduct",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "productMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "account",
                "path": "commissionableProduct"
              }
            ]
          }
        },
        {
          "name": "productDestination",
          "writable": true
        },
        {
          "name": "droplinked",
          "writable": true,
          "address": "4QJUPa4yudpPB7joCk53Q9uy6RX1c6ARYDnbZnqtowUD"
        },
        {
          "name": "priceMint"
        },
        {
          "name": "purchaserPriceAssociated",
          "writable": true
        },
        {
          "name": "ownerPriceAssociated",
          "writable": true
        },
        {
          "name": "droplinkedPriceAssociated",
          "writable": true
        },
        {
          "name": "publisherPriceAssociated",
          "writable": true,
          "optional": true
        },
        {
          "name": "publisher",
          "writable": true,
          "optional": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "purchaseCommissionableProductUsd",
      "discriminator": [
        131,
        156,
        98,
        56,
        22,
        109,
        14,
        17
      ],
      "accounts": [
        {
          "name": "purchaser",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true
        },
        {
          "name": "publisher",
          "writable": true,
          "optional": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "commissionableProduct",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "productMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "account",
                "path": "commissionableProduct"
              }
            ]
          }
        },
        {
          "name": "productDestination",
          "writable": true
        },
        {
          "name": "droplinked",
          "writable": true,
          "address": "4QJUPa4yudpPB7joCk53Q9uy6RX1c6ARYDnbZnqtowUD"
        },
        {
          "name": "chainlinkStoreProgram"
        },
        {
          "name": "chainlinkPriceFeed"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "purchaseStandardProductSol",
      "discriminator": [
        34,
        163,
        246,
        43,
        121,
        69,
        36,
        62
      ],
      "accounts": [
        {
          "name": "purchaser",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "standardProduct",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "productMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "account",
                "path": "standardProduct"
              }
            ]
          }
        },
        {
          "name": "productDestination",
          "writable": true
        },
        {
          "name": "droplinked",
          "writable": true,
          "address": "4QJUPa4yudpPB7joCk53Q9uy6RX1c6ARYDnbZnqtowUD"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "purchaseStandardProductSpl",
      "discriminator": [
        184,
        71,
        21,
        163,
        174,
        64,
        92,
        147
      ],
      "accounts": [
        {
          "name": "purchaser",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "standardProduct",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "productMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "account",
                "path": "standardProduct"
              }
            ]
          }
        },
        {
          "name": "productDestination",
          "writable": true
        },
        {
          "name": "droplinked",
          "writable": true,
          "address": "4QJUPa4yudpPB7joCk53Q9uy6RX1c6ARYDnbZnqtowUD"
        },
        {
          "name": "priceMint"
        },
        {
          "name": "purchaserPriceAssociated",
          "writable": true
        },
        {
          "name": "ownerPriceAssociated",
          "writable": true
        },
        {
          "name": "droplinkedPriceAssociated",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "purchaseStandardProductUsd",
      "discriminator": [
        7,
        81,
        91,
        29,
        255,
        132,
        220,
        234
      ],
      "accounts": [
        {
          "name": "purchaser",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "standardProduct",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "productMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "account",
                "path": "standardProduct"
              }
            ]
          }
        },
        {
          "name": "productDestination",
          "writable": true
        },
        {
          "name": "droplinked",
          "writable": true,
          "address": "4QJUPa4yudpPB7joCk53Q9uy6RX1c6ARYDnbZnqtowUD"
        },
        {
          "name": "chainlinkStoreProgram"
        },
        {
          "name": "chainlinkPriceFeed"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "whitelistPublisher",
      "discriminator": [
        106,
        237,
        182,
        76,
        38,
        39,
        250,
        155
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "shop",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  104,
                  111,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "shopNonce"
              }
            ]
          }
        },
        {
          "name": "commissionableProduct",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "account",
                "path": "shop"
              },
              {
                "kind": "arg",
                "path": "productNonce"
              }
            ]
          }
        },
        {
          "name": "publisher"
        }
      ],
      "args": [
        {
          "name": "shopNonce",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        },
        {
          "name": "productNonce",
          "type": {
            "array": [
              "u8",
              8
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "commissionableProduct",
      "discriminator": [
        55,
        0,
        74,
        225,
        166,
        204,
        66,
        226
      ]
    },
    {
      "name": "shop",
      "discriminator": [
        57,
        31,
        123,
        216,
        254,
        72,
        11,
        77
      ]
    },
    {
      "name": "standardProduct",
      "discriminator": [
        23,
        5,
        77,
        66,
        17,
        210,
        185,
        1
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "overflow",
      "msg": "overflow"
    },
    {
      "code": 6001,
      "name": "invalidCurrency",
      "msg": "product does not support the given payment currency"
    },
    {
      "code": 6002,
      "name": "invalidPriceMint",
      "msg": "product price mint is invalid"
    },
    {
      "code": 6003,
      "name": "publisherMaximumReached",
      "msg": "product publisher maximum reached"
    }
  ],
  "types": [
    {
      "name": "commissionableProduct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "shop",
            "type": "pubkey"
          },
          {
            "name": "variant",
            "type": {
              "defined": {
                "name": "productVariant"
              }
            }
          },
          {
            "name": "price",
            "type": {
              "defined": {
                "name": "productPrice"
              }
            }
          },
          {
            "name": "commission",
            "type": "u16"
          },
          {
            "name": "publishers",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "nonce",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          }
        ]
      }
    },
    {
      "name": "productInformation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "productPrice",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "usd",
            "fields": [
              {
                "name": "cents",
                "type": "u64"
              }
            ]
          },
          {
            "name": "sol",
            "fields": [
              {
                "name": "lamports",
                "type": "u64"
              }
            ]
          },
          {
            "name": "splToken",
            "fields": [
              {
                "name": "quantity",
                "type": "u64"
              },
              {
                "name": "mint",
                "type": "pubkey"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "productVariant",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "physical"
          },
          {
            "name": "print"
          },
          {
            "name": "service"
          }
        ]
      }
    },
    {
      "name": "shop",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "metadata",
            "type": "string"
          },
          {
            "name": "nonce",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          }
        ]
      }
    },
    {
      "name": "standardProduct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "shop",
            "type": "pubkey"
          },
          {
            "name": "variant",
            "type": {
              "defined": {
                "name": "productVariant"
              }
            }
          },
          {
            "name": "price",
            "type": {
              "defined": {
                "name": "productPrice"
              }
            }
          },
          {
            "name": "nonce",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          }
        ]
      }
    }
  ]
};
