"use server";
import { auth as luciaAuth } from "./index";

export const getServerAuthUser = async () => {
  return await luciaAuth();
};
