import { db } from "@/lib/db";
import { apiToken } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";

export const verifyToken = async (
  req: Request,
  bearerToken?: string
): Promise<AuthInfo | undefined> => {
  if (!bearerToken) return undefined;

  // TODO: Replace with actual token verification logic
  // This is just an example implementation
  console.log(bearerToken)
  const tokenRecord = await db.query.apiToken.findFirst({
    where: eq(apiToken.token, bearerToken),
    with:{
      permissions:true
    }
  });

  if (!tokenRecord) return undefined;
  const data=tokenRecord.permissions

  return {
    token: bearerToken,
    scopes: data?.scope||[],
    clientId: tokenRecord.id,
    extra: {
      userId: tokenRecord.userId,
      // Add any additional user/client information here
      permissions: data?.permission||[],
      timestamp: new Date().toISOString(),
    },
  };
};
