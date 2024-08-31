/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/random.json`.
 */
export type Random = {
  "address": "FHAmwQ5qTLVXd1zqU9agC4iG3VigaA8XRGaaQVcUujD9",
  "metadata": {
    "name": "random",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "authorizationTransfer",
      "discriminator": [
        2,
        128,
        60,
        16,
        179,
        99,
        191,
        105
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "bounty",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "claimBounty",
      "discriminator": [
        225,
        157,
        163,
        238,
        239,
        169,
        75,
        226
      ],
      "accounts": [
        {
          "name": "bounty",
          "writable": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "winner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createBounty",
      "discriminator": [
        122,
        90,
        14,
        143,
        8,
        125,
        200,
        2
      ],
      "accounts": [
        {
          "name": "bounty",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  117,
                  110,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "selectWinner",
      "discriminator": [
        119,
        66,
        44,
        236,
        79,
        158,
        82,
        51
      ],
      "accounts": [
        {
          "name": "bounty",
          "writable": true
        },
        {
          "name": "creator",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "winner",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bounty",
      "discriminator": [
        237,
        16,
        105,
        198,
        19,
        69,
        242,
        234
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidOwner",
      "msg": "Not a valid owner"
    },
    {
      "code": 6001,
      "name": "alreadyClaimed",
      "msg": "Already Claimed"
    },
    {
      "code": 6002,
      "name": "noWinner",
      "msg": "No winner"
    },
    {
      "code": 6003,
      "name": "nonAuthorized",
      "msg": "Non-authorized"
    }
  ],
  "types": [
    {
      "name": "bounty",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "bool"
          },
          {
            "name": "authorized",
            "type": "bool"
          },
          {
            "name": "winner",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    }
  ]
};
