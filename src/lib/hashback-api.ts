// Hashback API Integration for M-Pesa STK Push
// Credentials are handled server-side via Vercel serverless functions

export interface InitiateSTKPushResponse {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  CustomerMessage?: string;
}

export interface CheckTransactionStatusResponse {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: string;
  ResultDesc: string;
}

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("0")) {
    return "254" + cleaned.substring(1);
  } else if (cleaned.startsWith("+")) {
    return cleaned.substring(1);
  }
  return cleaned;
}

/**
 * Initiate STK Push to customer's M-Pesa
 * @param amount - Amount to be charged
 * @param phoneNumber - Phone number in format 2547XXXXXXXX or 0712345678
 * @param reference - Unique reference for this transaction
 * @returns Promise with checkout_id for tracking
 */
export async function initiateSTKPush(
  amount: string,
  phoneNumber: string,
  reference: string
): Promise<InitiateSTKPushResponse> {
  const msisdn = formatPhoneNumber(phoneNumber);

  const response = await fetch("/api/initiatestk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, msisdn, reference }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("STK Push Error Response:", response.status, errorText);
    throw new Error(`STK Push failed: ${response.status} - ${errorText}`);
  }

  const data: InitiateSTKPushResponse = await response.json();

  if (data.ResponseCode !== "0") {
    throw new Error(data.ResponseDescription || "STK Push failed");
  }

  return data;
}

/**
 * Check transaction status using checkout_id
 * @param checkoutId - The checkout_id returned from initiateSTKPush
 * @returns Promise with transaction status details
 */
export async function checkTransactionStatus(
  checkoutId: string
): Promise<CheckTransactionStatusResponse> {
  const response = await fetch("/api/transactionstatus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checkoutid: checkoutId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Status check failed: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Poll for transaction status until success, failure, or timeout
 * @param checkoutId - The checkout_id to track
 * @param maxAttempts - Maximum number of polling attempts (default: 30)
 * @param intervalMs - Milliseconds between attempts (default: 3000)
 * @returns Promise that resolves when transaction completes or rejects on timeout
 */
export async function pollTransactionStatus(
  checkoutId: string,
  maxAttempts: number = 30,
  intervalMs: number = 3000
): Promise<CheckTransactionStatusResponse> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const checkStatus = async () => {
      try {
        attempts++;
        const status = await checkTransactionStatus(checkoutId);

        if (status.ResultCode === "0") {
          resolve(status);
          return;
        }

        if (attempts >= maxAttempts) {
          reject(new Error("Transaction polling timeout - please check status manually"));
          return;
        }

        setTimeout(checkStatus, intervalMs);
      } catch (error) {
        reject(error);
      }
    };

    checkStatus();
  });
}
