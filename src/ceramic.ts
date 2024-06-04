import { DID } from "dids";
import { getResolver } from "key-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { fromString } from "uint8arrays/from-string";
import { ComposeClient } from "@composedb/client";
import { RuntimeCompositeDefinition } from "@composedb/types";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { DIDSession } from "did-session";

import json from "./2-models/composite.compiled.json";
export const CeramicNodeURL = "http://localhost:7007/";

/** This method should be called from a Server application in the backend to create the DID using a PrivateKey */
export async function createComposeClientOnServer() {
  const seed = "1d82241bf6bf7ef2d4409627bb581c34aad533fd1dc677c9b5d53ea2c3b9cfffe";  // from src/ceramic-keys.txt
  const privateKey = fromString(seed, "base16");
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(privateKey),
  });
  await did.authenticate();

  const composeClient = new ComposeClient({
    ceramic: CeramicNodeURL,
    definition: json as RuntimeCompositeDefinition,
  })
  composeClient.setDID(did);
  return composeClient;
}

/** This method should be called from a FrontEnd application to create the DID using MetaMask Wallet */
export async function createComposeClientOnFrontend(
  ethProvider: any,
  account: string) {
  const accountId = await getAccountId(ethProvider, account)
  const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)

  const composeClient = new ComposeClient({
    ceramic: new CeramicClient(CeramicNodeURL),
    definition: json as RuntimeCompositeDefinition,
  });

  const session = await DIDSession.get(accountId, authMethod, {
    resources: composeClient.resources,
  });
  composeClient.setDID(session.did);
  return composeClient;
}