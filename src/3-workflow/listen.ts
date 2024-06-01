import { EventSource } from "cross-eventsource";
import { CeramicNodeURL } from "../ceramic";
import { JsonAsString, AggregationDocument } from '@ceramicnetwork/codecs';
import { decode } from "codeco";

export async function main() {
  const source = new EventSource(`${CeramicNodeURL}api/v0/feed/aggregation/documents`)
  const Codec = JsonAsString.pipe(AggregationDocument);
  let rowId = 1;

  source.addEventListener('message', async (event) => {
    // console.log('message', event)
    //use JsonAsString, and AggregationDocument to decode and use event.data
    const parsedData = decode(Codec, event.data);
    console.log(`Row - ${rowId++} `, JSON.stringify(parsedData));
    console.log("=====================================");
  })

  source.addEventListener('error', error => {
    console.log('error', error)
  })

  console.log('listening...')
}

main()
  .then(() => { })
  .catch((e) => {
    console.log("Error", e);
  });