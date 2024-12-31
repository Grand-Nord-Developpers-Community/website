"use client";
import { useSearchParams } from "next/navigation";
const errorCodes = ["Configuration", "AccessDenied", "Verification", "Default"];
export default function ErrCode() {
  const search = useSearchParams();
  const errorCode = search.get("error") || "";
  const isValid = errorCodes.includes(errorCode);
  return <>{isValid && errorCode !== "Default" ? errorCode : "Non defini"}</>;
}
