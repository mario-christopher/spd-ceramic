import {
  CredentialType,
  PrimaryType,
  SignedAssertion,
  TrustCredentialType,
  TrustworthinessScope,
} from "./types";

const signedAssertion: SignedAssertion =
{
  "@context": ["https://www.w3.org/2018/credentials/v2"],
  type: [PrimaryType, CredentialType],
  issuanceDate: `"2024-04-05T21:59:50.406Z"`,
  issuer: `did:pkh:eip155:1:0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`,
  credentialSubject: {
    id: `did:pkh:eip155:1:0xC63caBe93bB29c61E337a87B2E3d4D7C5F5556c0`,
    trustworthiness: [
      {
        scope: TrustworthinessScope.SoftwareDevelopment,
        level: 1.0,
        reason: ["Oh"],
      },
      {
        scope: TrustworthinessScope.SoftwareSecurity,
        level: 1.0,
        reason: ["No"],
      },
    ],
  },
  proof: {
    created: `"2024-04-05T21:59:50.406Z"`,
    proofValue: `0x086d8e1a00fb51c5c6f490a555b6c4b1dc7180d9425539792f0a67ba6708b6801960a86ce136f9f7a3e144d4df5702b0be47ebf99bfe8eb5eea114c2ee22121d1c`,
    proofPurpose: "assertionMethod",
    type: "EthereumEip712Signature2021",
    verificationMethod: `did:pkh:eip155:1:0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266#blockchainAccountId`,
    eip712: {
      domain: {
        name: PrimaryType,
        version: "1",
      },
      types: {
        EIP712Domain: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "version",
            type: "string",
          },
          {
            name: "chainId",
            type: "uint256",
          },
        ],
        VerifiableCredential: [
          {
            name: "@context",
            type: "string[]",
          },
          {
            name: "type",
            type: "string[]",
          },
          {
            name: "issuanceDate",
            type: "string",
          },
          {
            name: "issuer",
            type: "string",
          },
          {
            name: "credentialSubject",
            type: "CredentialSubject",
          },
          {
            name: "proof",
            type: "Proof",
          },
        ],
        Trustworthiness: [
          {
            name: "scope",
            type: "string",
          },
          {
            name: "level",
            type: "int8",
          },
          {
            name: "reason",
            type: "string[]",
          },
        ],
        CredentialSubject: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "trustworthiness",
            type: "Trustworthiness[]",
          },
        ],
        Proof: [
          {
            name: "created",
            type: "string",
          },
          {
            name: "proofPurpose",
            type: "string",
          },
          {
            name: "type",
            type: "string",
          },
          {
            name: "verificationMethod",
            type: "string",
          },
        ],
      },
      primaryType: TrustCredentialType.VerifiableCredential,
    },
  },
};