import { createSnapAssertion, getAccountTypes, getEip712Domain } from "../1-types/snap";
import { SnapCredentialSubject, SnapCurrentStatus } from "../1-types/types";
import { createComposeClientOnServer } from "../ceramic";
import { getAccount, getSnapId, signAssertion, verifyAssertion } from "../eth-accounts";

async function main() {
  const compose = await createComposeClientOnServer();

  const issuerIndex = 2;
  const snapIndex = 3;
  const issuer = getAccount(issuerIndex);
  const snapId = getSnapId(snapIndex);
  const assertion = createSnapAssertion(
    issuer.address,
    snapId,
    new Date().toISOString(),
    SnapCurrentStatus.Disputed
  );

  const domain = getEip712Domain();
  const types = getAccountTypes();
  const signature = await signAssertion(domain, types, assertion, issuerIndex);
  console.log("Assertion", assertion, domain, types, signature);
  console.log(
    "Verified:",
    verifyAssertion(domain, types, assertion, issuerIndex, signature)
  );

  const result = await compose.executeQuery(`
      mutation CreateSnapAssertion {
        setSnapAssertion(input: {
          content: {
            context: ["${assertion["@context"]}"]
            type: [${assertion.type.map(t => `"${t}"`)}]
            issuanceDate: "${assertion.issuanceDate}"
            snapId: "${assertion.credentialSubject.id}"
            credentialSubject: {
              currentStatus: "${(assertion.credentialSubject as SnapCredentialSubject).currentStatus}"
              statusReason: {
                type: "${(assertion.credentialSubject as SnapCredentialSubject).statusReason.type}"
                value: ${(assertion.credentialSubject as SnapCredentialSubject).statusReason.value.map(v => `"${v}"`)}
              }
            }
            proofValue: "${signature}"
          }
        })
        {
          document {
            id
            issuer {
              id
            }
            snapId
            credentialSubject {
              currentStatus
              statusReason {
                type
                value
              }
            }
            proofValue
          }
        }
      }
  `);

  console.log("Result", JSON.stringify(result));
}

main()
  .then(() => { })
  .catch((e) => {
    console.log("Error", e);
  });