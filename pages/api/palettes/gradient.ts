import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ success: false, message: "Only POST requests allowed" });
  } else if (!session) {
    res.status(401).json({ success: false, message: "Not authenticated" });
  } else {
    const parsedData = JSON.parse(req.body);
    const { type, name, direction, fromValue, viaValue, toValue } = parsedData;

    await prisma.gradient
      .create({
        data: {
          type,
          name,
          direction,
          fromValue,
          viaValue,
          toValue,
          author: {
            connectOrCreate: {
              where: {
                email: session.user?.email as string
              },
              create: {
                email: session.user?.email as string
              }
            }
          }
        }
      })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((e: any) => {
        res.status(500).json({ success: false, message: e.message });
      });
  }
}
