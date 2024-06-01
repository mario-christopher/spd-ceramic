import { TypedDataDomain, ethers } from "ethers";
import { Assertion, TypedDataTypes } from "./1-types/types";

const phrase =
  "amateur topic addict pill you inform security mosquito manual plastic pride apology";

export function getAccount(index: number) {
  const account = ethers.HDNodeWallet.fromPhrase(
    phrase,
    "",
    `m/44'/60'/0'/0/${index}`
  );
  return account;
}

export function getSnapId(index: number) {
  return [
    "lXa6Y31ymkkxyR5IldOQKq4HnQEMAeEI1CrC54FL8C8=",
    "uq4KYgMufU824Q1zJU6om4IF7cDXrROZnICrLKEkua0=",
    "HCOp9b2PGeUPCpEthvGWnn2jnKPYYf6nZnBc8KXVwuc=",
    "RlM47JKcUCYEWssO7bUALpR3mrVBpnOfdx6pylodHgU=",
    "+RC3pwNreHxiMjByPmX0vglQye6wRfdfqC3/Y20tnc8=",
    "6wP6Hm3oTFQcO7CU9pj+LB0WvzU1dO1H3D9FRwieyo8=",
    "EhHC32ZDU+SWvnUAcm2ibsZdqfwlr4h+mAvmCqyPPK0="
  ][index];
}

export async function signAssertion(
  domain: TypedDataDomain,
  types: TypedDataTypes,
  value: Assertion,
  signerIndex: number
) {
  const signer = getAccount(signerIndex);
  const signature = await signer.signTypedData(domain, types, value);
  return signature;
}

export function verifyAssertion(
  domain: TypedDataDomain,
  types: TypedDataTypes,
  value: Assertion,
  signerIndex: number,
  signature: string
) {
  const signer = getAccount(signerIndex);
  const addr = ethers.verifyTypedData(domain, types, value, signature);
  return addr == signer.address;
}
