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
} from "firebase/firestore";
import Book from "@/types/Book";

export default class CatalogController {
  static lastOfList = null;

  static async list(startOver = false) {
    // TODO: query where
    const last = startOver ? null : CatalogController.lastOfList;
    const q = query(
      collection(db, `books`),
      orderBy(`title`),
      limit(10),
      startAfter(last)
    );
    const books = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      books.push(Book.fromJson(doc.data()));
    });
    CatalogController.lastOfList = querySnapshot.docs[querySnapshot.docs.length - 1];
    return books;
  }

  static async count() {
    const snapshot = await getCountFromServer(collection(db, `books`));
    return snapshot.data().count;
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
