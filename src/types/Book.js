export default class Book {
  title = '';
  author = '';
  isbn = '';
  coverUrl = '';

  static fromJson(json) {
    const book = new Book();
    book.title = json.title ?? '未命名';
    book.author = json.author ?? '無作者';
    book.isbn = json.isbn ?? 'ISBN 未知';
    book.coverUrl = json.coverUrl ?? 'https://via.placeholder.com/150?text=No+Cover';
    return book;
  }
}