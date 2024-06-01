import { createComposeClientOnServer } from "../ceramic";

export async function main() {
  const compose = await createComposeClientOnServer();

  const query: any = await compose.executeQuery(`
  query GetAccountAssertions {
    accountAssertionIndex(
      first: 200
    ) {
      edges {
        node {
          id
          issuer {
            id
          }
          subjectId {
            id
          }
          issuanceDate
          credentialSubject {
            trustWorthiness {
              level
              scope
              reason
            }
          }
        }
      }
    }
  }
`);
console.log(JSON.stringify(query));
}

main()
  .then(() => { })
  .catch((e) => {
    console.log("Error", e);
  });