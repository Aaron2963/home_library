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

export function toTimestamp(date) {
  return Timestamp.fromDate(date);
}

export function toAgo(timestamp) {
  if (!timestamp) return "";
  const diff = Date.now() - timestamp.toDate().getTime();
  if (diff > 86400000) {
    return `${Math.floor(diff / 86400000)} 天前`;
  } else if (diff > 3600000) {
    return `${Math.floor(diff / 3600000)} 小時前`;
  } else if (diff > 60000) {
    return `${Math.floor(diff / 60000)} 分鐘前`;
  } else {
    return `${Math.floor(diff / 1000)} 秒前`;
  }
}