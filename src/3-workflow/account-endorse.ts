import { createAccountAssertion, getEip712Domain, getAccountTypes } from "../1-types/account";
import { AccountCredentialSubject } from "../1-types/types";
import { createComposeClientOnServer } from "../ceramic";
import { getAccount, signAssertion, verifyAssertion } from "../eth-accounts";

async function main() {
  const compose = await createComposeClientOnServer();

  const issuerIndex = 0;
  const subjectIndex = 4;
  const issuer = getAccount(issuerIndex);
  const subject = getAccount(subjectIndex);
  const assertion = createAccountAssertion(
    issuer.address,
    subject.address,
    new Date().toISOString(),
    "Endorse"
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
      mutation CreateAccountAssertion {
        setAccountAssertion(input: {
          content: {
            context: ["${assertion["@context"]}"]
            type: [${assertion.type.map(t => `"${t}"`)}]
            issuanceDate: "${assertion.issuanceDate}"
            subjectId: "${assertion.credentialSubject.id}"
            credentialSubject: {
              trustWorthiness: [
                ${(assertion.credentialSubject as AccountCredentialSubject).trustworthiness.map(tw => {
    return `{
                    scope: "${tw.scope}"
                    level: ${tw.level}
                    reason: [${tw.reason.map(r => `"${r}"`)}]
                  }`
  })}
              ]
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
            subjectId {
              id
            }
            credentialSubject {
              trustWorthiness {
                level
                scope
                reason
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