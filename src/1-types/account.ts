import {
  AccountCredentialSubject,
  Assertion,
  AssertionType,
  CredentialType,
  PrimaryType,
  Trustworthiness,
  TrustworthinessScope,
  TypedDataDomain,
  TypedDataTypes,
} from "./types";

export function createAccountAssertion(
  issuer: string,
  subjectId: string,
  issuanceDate: string,
  assertionType: AssertionType
): Assertion {
  let trustworthiness: Trustworthiness[] = [];
  if (assertionType == "Endorse") {
    trustworthiness = [
      {
        scope: TrustworthinessScope.SoftwareDevelopment,
        level: 1.0,
        reason: ["Oh"],
      },
      {
        scope: TrustworthinessScope.SoftwareSecurity,
        level: 1.0,
        reason: ["No:4"],
      },
    ];
  } else if (assertionType == "Report") {
    trustworthiness = [
      {
        scope: TrustworthinessScope.Honesty,
        level: -1.0,
        reason: [
          "Scamming",
          "Hacking",
          "Harassment",
          "Disinformation",
          "Other",
        ],
      },
    ];
  }

  return {
    "@context": ["https://www.w3.org/2018/credentials/v2"],
    type: [PrimaryType, CredentialType],
    issuanceDate: `${issuanceDate}`,
    issuer: `did:pkh:eip155:1:${issuer}`,
    credentialSubject: {
      id: `did:pkh:eip155:1:${subjectId}`,
      trustworthiness: trustworthiness,
    } as AccountCredentialSubject,
  };
}

export function getEip712Domain(): TypedDataDomain {
  //  chainId and contractAddress are optional.
  //  Since we are not storing anything on chain, they can be omitted.
  return {
    name: PrimaryType,
    version: "1",
  };
}

export function getAccountTypes(): TypedDataTypes {
  return {
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
  };
}
