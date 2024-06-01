import {
  Assertion,
  CredentialType,
  PrimaryType,
  SnapCredentialSubject,
  SnapCurrentStatus,
  SnapStatusReasonType,
  TypedDataDomain,
  TypedDataTypes,
} from "./types";

export function createSnapAssertion(
  issuer: string,
  snapId: string,
  issuanceDate: string,
  currentStatus: SnapCurrentStatus
): Assertion {
  return {
    "@context": ["https://www.w3.org/2018/credentials/v2"],
    type: [PrimaryType, CredentialType],
    issuanceDate: `${issuanceDate}`,
    issuer: `did:pkh:eip155:1:${issuer}`,
    credentialSubject: {
      id: `snap://${snapId}`,
      currentStatus: currentStatus,
      statusReason: {
        type: currentStatus == SnapCurrentStatus.Endorsed ? SnapStatusReasonType.Endorse : SnapStatusReasonType.Malicious,
        value: currentStatus == SnapCurrentStatus.Endorsed ? [`Good user experience`] : [`Scam`],
      }
    } as SnapCredentialSubject,
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
    StatusReason: [
      {
        name: 'type',
        type: 'string',
      },
      {
        name: 'value',
        type: 'string[]',
      },
    ],
    CredentialSubject: [
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'currentStatus',
        type: 'string',
      },
      {
        name: 'statusReason',
        type: 'StatusReason',
      },
    ],
  };
}
