export default class Book {
  title = '';
  author = '';
  isbn10 = '';
  isbn13 = '';
  publisher = '';
  publishedDate = 0;
  note = '';

  static fromJson(json) {
    const book = new Book();
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
      title: this.title,
      author: this.author,
      isbn10: this.isbn10,
      isbn13: this.isbn13,
      publisher: this.publisher,
      publishedDate: this.publishedDate,
      note: this.note,
    };
  }
}