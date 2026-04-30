import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_KEY = process.env.HASHBACK_API_KEY || "";
const ACCOUNT_ID = process.env.HASHBACK_ACCOUNT_ID || "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!API_KEY || !ACCOUNT_ID) {
    console.error("Missing Hashback API credentials");
    return res.status(500).json({ error: "Payment service not configured" });
  }

  try {
    const { checkoutid } = req.body;

    if (!checkoutid) {
      return res.status(400).json({ error: "Missing required field: checkoutid" });
    }

    const response = await fetch("https://api.hashback.co.ke/transactionstatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: API_KEY,
        account_id: ACCOUNT_ID,
        checkoutid,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Transaction status error:", error);
    return res.status(500).json({ error: "Failed to check transaction status" });
  }
}
