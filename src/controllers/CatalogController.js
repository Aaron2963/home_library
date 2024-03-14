import { db } from "@/utils/db.js";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  query,
  limit,
  orderBy,
  startAfter,
  getCountFromServer,
  where,
} from "firebase/firestore";
import Book from "@/types/Book";

export default class CatalogController {
  static async list(last, by = "title", condition = null) {
    const lim = 1,
      coll = collection(db, `books`);
    let q = null,
      cq = null;
    if (condition) {
      let wh = where(by, ">=", condition);
      if (["isbn10", "isbn13"].includes(by)) {
        wh = where(by, "==", condition);
      }
      q = query(coll, wh, orderBy(by), limit(lim), startAfter(last));
      cq = query(coll, wh);
    } else {
      q = query(coll, orderBy(by), limit(lim), startAfter(last));
      cq = query(coll);
    }
    const books = [];
    const countSnapshot = await getCountFromServer(cq);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      books.push(Book.fromJson(doc.data()));
    });
    return {
      total: countSnapshot.data().count,
      data: books,
    };
  }

  static async get(isbn) {
    const dc = doc(db, `books`, isbn);
    const book = await getDoc(dc);
    if (!book.exists()) {
      throw new Error(`No such document: books/${isbn}`);
    }
    return Book.fromJson(book.data());
  }
}
