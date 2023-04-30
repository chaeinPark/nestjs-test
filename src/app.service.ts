import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const { data } = await axios.get("http://localhost:9200/test/_search", {
      data: {
        "query": {
          "match": {
            "name": "ho"
          }
        }
      }
    })

    const client = new Client({
      node: 'http://localhost:9200',
    })
    
    const { hits } = await client.search<{name: string}>({
      index: "test",
      query: {
        "match": {
          "name": "ho"
        }
      }
    })

    return `api: ${data.hits.hits[0]._source.name}, client: ${hits.hits[0]._source!.name}` as string;
  }
}
