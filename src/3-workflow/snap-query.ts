import { createComposeClientOnServer } from "../ceramic";

export async function main() {
  const compose = await createComposeClientOnServer();

  const query: any = await compose.executeQuery(`
  query GetSnapAssertions {
    snapAssertionIndex(
      first: 200
    ) {
      edges {
        node {
          id
          issuer {
            id
          }
          snapId
          issuanceDate
          credentialSubject {
            currentStatus
            statusReason {
              type
              value
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