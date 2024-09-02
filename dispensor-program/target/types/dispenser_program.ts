/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/dispenser_program.json`.
 */
export type DispenserProgram = {
  "address": "8V1tcPcvW2LhkKou4rDpKdaXWVeKtyuvtihrBzWgMfgA",
  "metadata": {
    "name": "dispenserProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializeEscrow",
      "discriminator": [
        243,
        160,
        77,
        153,
        11,
        92,
        48,
        209
      ],
      "accounts": [
        {
          "name": "host",
          "writable": true,
          "signer": true
        },
        {
          "name": "escrow",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "host"
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
          "name": "winners",
          "type": {
            "vec": "pubkey"
          }
        },
        {
          "name": "prizes",
          "type": {
            "vec": "u64"
          }
        }
      ]
    },
    {
      "name": "withdrawPrize",
      "discriminator": [
        125,
        86,
        6,
        204,
        176,
        159,
        61,
        119
      ],
      "accounts": [
        {
          "name": "escrow",
          "writable": true
        },
        {
          "name": "winner",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "winnerPubkey",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "escrow",
      "discriminator": [
        31,
        213,
        123,
        187,
        186,
        22,
        218,
        155
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Unauthorized: Caller is not one of the selected winners."
    },
    {
      "code": 6001,
      "name": "mismatchedPrizesAndWinners",
      "msg": "Mismatched number of prizes and winners."
    },
    {
      "code": 6002,
      "name": "prizeAlreadyClaimed",
      "msg": "The prize has already been claimed."
    },
    {
      "code": 6003,
      "name": "tooManyWinners",
      "msg": "Too many winners exceeding the maximum limit."
    }
  ],
  "types": [
    {
      "name": "escrow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "host",
            "type": "pubkey"
          },
          {
            "name": "hashedWinners",
            "type": {
              "vec": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          },
          {
            "name": "prizes",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "totalAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
