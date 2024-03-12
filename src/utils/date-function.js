import { format } from "date-fns";

// convert Timestamp to Date String
export function toDate(timestamp) {
  if (!timestamp) return "";
  return format(timestamp.toDate(), "yyyy-MM-dd HH:mm");
}