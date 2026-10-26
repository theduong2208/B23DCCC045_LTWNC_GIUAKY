import { makeStore } from '../src/app/store';
import { borrowBook } from '../src/features/books/booksSlice';
import { Book, MAX_BORROW_LIMIT } from '../src/types/book';

describe('borrowLimit middleware', () => {
  const books: Book[] = [
    { id: 'b01', title: 'Sách 1', author: 'TG 1', category: 'CNTT', year: 2020, available: 5 },
    { id: 'b02', title: 'Sách 2', author: 'TG 2', category: 'CNTT', year: 2021, available: 5 },
    { id: 'b03', title: 'Sách 3', author: 'TG 3', category: 'Kinh tế', year: 2022, available: 5 },
    { id: 'b04', title: 'Sách 4', author: 'TG 4', category: 'Ngoại ngữ', year: 2023, available: 5 },
  ];

  it('cho phép mượn tối đa 3 cuốn; mượn cuốn thứ 4 bị chặn và dispatch cảnh báo', () => {
    const store = makeStore({
      books: {
        items: books,
        status: 'succeeded',
        error: null,
        borrowedIds: ['b01', 'b02', 'b03'], // Đã mượn đủ 3 cuốn
        warning: null,
      },
    });

    // Thử mượn cuốn thứ 4
    store.dispatch(borrowBook('b04'));

    const state = store.getState().books;

    // 1. borrowedIds vẫn giữ nguyên 3 cuốn, cuốn thứ 4 KHÔNG được thêm vào
    expect(state.borrowedIds).toHaveLength(MAX_BORROW_LIMIT);
    expect(state.borrowedIds).not.toContain('b04');

    // 2. Số lượng available của cuốn thứ 4 không bị giảm
    const book4 = state.items.find((b) => b.id === 'b04');
    expect(book4?.available).toBe(5);

    // 3. Warning được kích hoạt
    expect(state.warning).toBeTruthy();
    expect(state.warning).toContain(`tối đa ${MAX_BORROW_LIMIT} cuốn`);
  });

  it('khi đang mượn dưới 3 cuốn thì mượn bình thường, không có cảnh báo', () => {
    const store = makeStore({
      books: {
        items: books,
        status: 'succeeded',
        error: null,
        borrowedIds: ['b01'], // Mới mượn 1 cuốn
        warning: null,
      },
    });

    store.dispatch(borrowBook('b02'));

    const state = store.getState().books;
    expect(state.borrowedIds).toEqual(['b01', 'b02']);
    expect(state.warning).toBeNull();
  });
});
