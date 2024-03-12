import { db } from "@/utils/db.js";
import { getDoc, doc } from "firebase/firestore/lite";
import Book from "@/types/Book";

export default class CatalogController {
  static async get(isbn) {
    const dc = doc(db, `books`, isbn);
    const book = await getDoc(dc);
    if (!book.exists()) {
      throw new Error(`No such document: books/${isbn}`);
    }
    return Book.fromJson(book.data());
  }
}