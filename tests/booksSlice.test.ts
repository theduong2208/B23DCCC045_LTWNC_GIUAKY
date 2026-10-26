import booksReducer, {
  initialState,
  borrowBook,
  returnBook,
  BooksState,
} from '../src/features/books/booksSlice';
import { fetchBooksThunk } from '../src/features/books/booksThunks';
import { Book } from '../src/types/book';

describe('booksSlice reducer', () => {
  const sampleBooks: Book[] = [
    {
      id: 'b01',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      category: 'CNTT',
      year: 2008,
      available: 3,
    },
    {
      id: 'b02',
      title: 'Kinh tế học vĩ mô',
      author: 'N. Gregory Mankiw',
      category: 'Kinh tế',
      year: 2020,
      available: 0, // Hết bản
    },
  ];

  it('fetchBooksThunk.pending -> status "loading" và xoá error', () => {
    const prevState: BooksState = {
      ...initialState,
      status: 'failed',
      error: 'Lỗi cũ',
    };
    const action = { type: fetchBooksThunk.pending.type };
    const nextState = booksReducer(prevState, action);

    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBeNull();
  });

  it('fetchBooksThunk.fulfilled -> lưu items, status "succeeded"', () => {
    const prevState: BooksState = {
      ...initialState,
      status: 'loading',
    };
    const action = {
      type: fetchBooksThunk.fulfilled.type,
      payload: sampleBooks,
    };
    const nextState = booksReducer(prevState, action);

    expect(nextState.status).toBe('succeeded');
    expect(nextState.items).toHaveLength(2);
    expect(nextState.items[0].title).toBe('Clean Code');
    expect(nextState.error).toBeNull();
  });

  it('fetchBooksThunk.rejected -> lưu error, status "failed"', () => {
    const prevState: BooksState = {
      ...initialState,
      status: 'loading',
    };
    const action = {
      type: fetchBooksThunk.rejected.type,
      payload: 'Lỗi kết nối máy chủ',
    };
    const nextState = booksReducer(prevState, action);

    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Lỗi kết nối máy chủ');
  });

  it('borrowBook -> giảm available đi 1 và thêm id vào borrowedIds', () => {
    const prevState: BooksState = {
      ...initialState,
      items: [
        { ...sampleBooks[0], available: 3 },
      ],
      borrowedIds: [],
    };

    const nextState = booksReducer(prevState, borrowBook('b01'));

    expect(nextState.borrowedIds).toContain('b01');
    const book = nextState.items.find((b) => b.id === 'b01');
    expect(book?.available).toBe(2);
  });

  it('returnBook -> tăng available lên 1 và xoá id khỏi borrowedIds', () => {
    const prevState: BooksState = {
      ...initialState,
      items: [
        { ...sampleBooks[0], available: 2 },
      ],
      borrowedIds: ['b01'],
    };

    const nextState = booksReducer(prevState, returnBook('b01'));

    expect(nextState.borrowedIds).not.toContain('b01');
    const book = nextState.items.find((b) => b.id === 'b01');
    expect(book?.available).toBe(3);
  });

  it('borrowBook với sách hết bản (available = 0) -> state không thay đổi', () => {
    const prevState: BooksState = {
      ...initialState,
      items: [
        { ...sampleBooks[1], available: 0 },
      ],
      borrowedIds: [],
    };

    const nextState = booksReducer(prevState, borrowBook('b02'));

    expect(nextState.borrowedIds).toEqual([]);
    const book = nextState.items.find((b) => b.id === 'b02');
    expect(book?.available).toBe(0);
  });

  it('borrowBook khi đã mượn cuốn sách này rồi -> không cho mượn trùng', () => {
    const prevState: BooksState = {
      ...initialState,
      items: [
        { ...sampleBooks[0], available: 2 },
      ],
      borrowedIds: ['b01'],
    };

    const nextState = booksReducer(prevState, borrowBook('b01'));

    // borrowedIds vẫn chỉ có 1 phần tử
    expect(nextState.borrowedIds).toEqual(['b01']);
    const book = nextState.items.find((b) => b.id === 'b01');
    expect(book?.available).toBe(2);
  });
});
