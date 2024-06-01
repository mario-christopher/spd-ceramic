export enum TrustworthinessScope {
  Honesty = 'Honesty',
  SoftwareSecurity = 'Software security',
  SoftwareDevelopment = 'Software development',
}

export enum SnapCurrentStatus {
  Endorsed = 'Endorsed',
  Disputed = 'Disputed',
}

export enum SnapStatusReasonType {
  Endorse = 'Endorse',
  Malicious = 'Malicious',
}

export enum TrustCredentialType {
  TrustCredential = 'TrustCredential',
  VerifiableCredential = 'VerifiableCredential',
  ReviewCredential = 'ReviewCredential',
}

export const PrimaryType = TrustCredentialType.VerifiableCredential;
export const CredentialType = TrustCredentialType.TrustCredential;
export type AssertionType = "Endorse" | "Report";

export type PKHDid = `did:pkh:eip155:${string}`;

export type SnapDid = `snap://${string}`;

export type Did = PKHDid | SnapDid;

export type StatusReason = {
  type: SnapStatusReasonType;
  value: string[];
};

export type Trustworthiness = {
  scope: TrustworthinessScope;
  level: number;
  reason: string[];
};

export type AccountCredentialSubject = {
  id: PKHDid;
  trustworthiness: Trustworthiness[];
};

export type SnapCredentialSubject = {
  id: SnapDid;
  currentStatus: SnapCurrentStatus;
  statusReason: StatusReason;
};

export type CredentialSubject =
  | AccountCredentialSubject
  | SnapCredentialSubject;

export type Assertion = {
  type: TrustCredentialType[];
  issuer: Did;
  issuanceDate: string;
  credentialSubject: CredentialSubject;
  '@context': string[];
};

export type TypedDataTypes = Record<
  string,
  {
    name: string;
    type: string;
  }[]
>;

export type TypedDataDomain = {
  name: string;
  version: string;
};

export type Eip712 = {
  domain: TypedDataDomain;
  primaryType: TrustCredentialType;
  types: TypedDataTypes;
};

export type Eip712Proof = {
  created: string;
  proofValue: string;
  proofPurpose: string;
  type: string;
  verificationMethod: string;
  eip712: Eip712;
};

export type SignedAssertion = Assertion & {
  proof: Eip712Proof;
};
