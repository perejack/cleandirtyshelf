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
    const { amount, msisdn, reference } = req.body;

    if (!amount || !msisdn || !reference) {
      return res.status(400).json({ error: "Missing required fields: amount, msisdn, reference" });
    }

    const response = await fetch("https://api.hashback.co.ke/initiatestk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: API_KEY,
        account_id: ACCOUNT_ID,
        amount,
        msisdn,
        reference,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("STK Push error:", error);
    return res.status(500).json({ error: "Failed to initiate payment" });
  }
}
