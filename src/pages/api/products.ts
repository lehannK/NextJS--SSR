import { NextApiRequest, NextApiResponse } from "next";
import products from "../../../database.json";

//essa função pega o database e retorna ele na rota api/products, com o status 200

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products);
}
