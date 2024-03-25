import { db, auth } from "@/utils/db";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import Session from "@/types/Session";

export default class SessionController {
  static unsubscribe = null;

  static async get() {
    const uid = auth.currentUser.uid;
    const dc = doc(db, `sessions`, uid);
    const session = await getDoc(dc);
    if (!session.exists()) {
      await this.clear();
      return new Session();
    }
    return Session.fromJson(session.data());
  }

  static async clear() {
    const uid = auth.currentUser.uid;
    const dc = doc(db, `sessions`, uid);
    await setDoc(dc, { payload: [] });
    return true;
  }

  static async remove(book) {
    const uid = auth.currentUser.uid;
    const dc = doc(db, `sessions`, uid);
    const session = await getDoc(dc);
    if (!session.exists()) {
      return false;
    }
    const payload = session.data().payload.filter((isbn) => isbn !== book.isbn13 && isbn !== book.isbn10);
    await setDoc(dc, { payload });
    return true;
  }

  static subscribe(callback) {
    const uid = auth.currentUser.uid;
    const dc = doc(db, `sessions`, uid);
    this.unsubscribe = onSnapshot(dc, (doc) => {
      if (!doc.exists()) {
        callback(new Session());
        return;
      }
      callback(Session.fromJson(doc.data()));
    });
  }
}
