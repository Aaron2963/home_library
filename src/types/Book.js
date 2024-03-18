import { toDate } from "@/utils/date-function";
import { Timestamp } from "firebase/firestore";

export default class Book {
  id = '';
  title = '';
  author = '';
  isbn10 = '';
  isbn13 = '';
  publisher = '';
  publishedDate = 0;
  note = '';

  static fromJson(json) {
    const book = new Book();
    book.id = json.id ?? '';
    book.title = json.title ?? '未命名';
    book.author = json.author ?? '無作者';
    book.isbn10 = json.isbn10 ?? '';
    book.isbn13 = json.isbn13 ?? '';
    book.publisher = json.publisher ?? '';
    book.publishedDate = json.publishedDate ?? 0;
    book.note = json.note ?? '';
    return book;
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      isbn10: this.isbn10,
      isbn13: this.isbn13,
      publisher: this.publisher,
      publishedDate: this.publishedDate,
      note: this.note,
    };
  }

  get publishedDateString() {
    return toDate(this.publishedDate, 'yyyy-MM-dd');
  }

  set publishedDateString(value) {
    this.publishedDate = Timestamp.fromDate(new Date(value));
  }

  get isbnString() {
    if (this.isbn13 !== '') {
      return this.isbn13.replace(/(\d{3})(\d{3})(\d{2})(\d{4})(\d{1})/, '$1-$2-$3-$4-$5');
    } else if (this.isbn10 !== '') {
      return this.isbn10.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1-$2-$3-$4');
    } else {
      return '';
    }
  }

  copy() {
    return Book.fromJson(this.toJson());
  }

  diff(book) {
    const diff = [], a = book.toJson(), b = this.toJson();
    for (const key in b) {
      if (a[key] !== b[key]) {
        diff.push(key);
      }
    }
    return diff;
  }
}