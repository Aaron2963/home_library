import { format } from "date-fns";

// convert Timestamp to Date String
export function toDate(timestamp, formatString = "yyyy-MM-dd HH:mm") {
  if (!timestamp) return "";
  return format(timestamp.toDate(), formatString);
}