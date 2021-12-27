import {NextApiRequest, NextApiResponse} from "next";
import {newsSource} from "../../data/news";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json(newsSource);
}