import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

// convert Timestamp to Date String
export function toDate(timestamp, formatString = "yyyy-MM-dd HH:mm") {
  if (!timestamp) return "";
  if (timestamp instanceof Timestamp) {
    return format(timestamp.toDate(), formatString);
  }
  return format(timestamp, formatString);
}