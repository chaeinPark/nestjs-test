import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const {data} = await axios.get("http://localhost:9200/test/_search", {
      data: {
        "query": {
          "match": {
            "name": "ho"
          }
        }
      }
    })

    return data.hits.hits[0]._source.name as string;
  }
}
