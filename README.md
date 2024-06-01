## Writing MetaMask User and Snap Assertions to Ceramic

### Ceramic Node setup

#### Install `rust-ceramic`

*MacOS*
```
curl -LO https://github.com/ceramicnetwork/rust-ceramic/releases/download/v0.13.0/ceramic-one_aarch64-apple-darwin.tar.gz

tar zxvf ceramic-one_aarch64-apple-darwin.tar.gz
```
Open Finder, double click the `ceramic-one.pkg` file to start the install.
After installation, copy the binary:
```
sudo cp /Applications/ceramic-one /usr/local/bin/
```

*Linux*
```
curl -LO https://github.com/ceramicnetwork/rust-ceramic/releases/download/v0.13.0/ceramic-one_x86_64-unknown-linux-gnu.tar.gz

tar zxvf ceramic-one_x86_64-unknown-linux-gnu.tar.gz

dpkg -i ceramic-one.deb
```

#### Install `js-ceramic`

```
npm install --location=global @ceramicnetwork/cli@nightly
```
---

### Start the Ceramic Node

Open a terminal and start the `rust-ceramic` process:

```ceramic-one daemon```

Open another terminal and run the `js-ceramic process`

```CERAMIC_RECON_MODE="true" ceramic daemon --ipfs-api http://localhost:5001```

---

### Setup Project

*Note:* For Windows machines, the project works only within a WSL distribution. Open VSCode and connect to a WSL distribution (eg. Ubuntu)

Clone the project to your local machine, and then install the dependencies.

```yarn install```

---

### Configure Admin DID
You will need an Admin DID to deploy the GraphQL models to the Ceramic node.

Create a private key:

```yarn private-key```

Copy the generated private key and paste it in the `package.json` file in:

`scripts/public-key` for the env-var `DID_PRIVATE_KEY`

`scripts/composite` for the cli param `--did-private-key`

`scripts/deploy` for the cli param `--did-private-key`

Create the public key:

```yarn public-key```

Add the full DID Public key string *(did:key:***)* to the `http-api.admin-dids` array property in the the `~/.ceramic/daemon.config.json` file.

Stop and restart the `js-ceramic` process. Keep the `rust-ceramic` and `js-ceramic` processes running.

---

### Deploy the Data models

Run the foll. commands:

To (re)create [Composites](src/2-models/composite.generated.json) of the [GraphQL data model](src/2-models/composite.graphql): 

```yarn composite```

To (re)deploy the Composites to the ceramic node: 

```yarn deploy```

To (re)generate a [compiled](src/2-models/composite.compiled.json) version to use in the [client code](src/ceramic.ts): 

```yarn compile```

The project is now ready to create assertions in Ceramic.

---

### Create, listen and Query Assertions

*(Optional)* To listen to assertions as they are created *(eg. indexing service)*, in a separate terminal, run : `yarn listen`

Endorse a user account :

```yarn acct:endorse```

Report a user account :

```yarn acct:report```

Endorse a Snap :

```yarn snap:endorse```

Report a Snap :

```yarn snap:report```

Query all user account assertions:

```yarn acct:query```

Query all snap assertions:

```yarn snap:query```

---