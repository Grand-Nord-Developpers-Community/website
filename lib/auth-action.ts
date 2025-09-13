import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";
export const authAction = createSafeActionClient({
  async middleware(parsedInput) {
    const { user } = await auth();
    const userId = user?.id;

    if (!userId) {
      throw new Error("Session is not valid!");
    }

    return { userId };
  },
  handleReturnedServerError(e) {
    return e.message;
  },
});
