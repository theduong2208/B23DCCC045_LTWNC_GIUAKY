import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookItem } from '../src/features/books/BookItem';
import { Book } from '../src/types/book';

describe('BookItem component', () => {
  const mockBook: Book = {
    id: 'b-test-1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'CNTT',
    year: 2008,
    available: 5,
  };

  const mockOutOfStockBook: Book = {
    ...mockBook,
    id: 'b-test-2',
    title: 'Design Patterns',
    available: 0,
  };

  it('hiển thị đúng tên, tác giả, thể loại, năm xuất bản và số bản còn lại', () => {
    const handleBorrow = jest.fn();
    const handleReturn = jest.fn();

    render(
      <BookItem
        book={mockBook}
        isBorrowed={false}
        onBorrow={handleBorrow}
        onReturn={handleReturn}
      />
    );

    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText(/2008/)).toBeInTheDocument();
    expect(screen.getByText('Còn 5 bản')).toBeInTheDocument();
  });

  it('click nút "Mượn sách" gọi onBorrow đúng 1 lần với đúng id sách', async () => {
    const user = userEvent.setup();
    const handleBorrow = jest.fn();
    const handleReturn = jest.fn();

    render(
      <BookItem
        book={mockBook}
        isBorrowed={false}
        onBorrow={handleBorrow}
        onReturn={handleReturn}
      />
    );

    const borrowBtn = screen.getByRole('button', { name: /mượn sách/i });
    expect(borrowBtn).not.toBeDisabled();

    await user.click(borrowBtn);

    expect(handleBorrow).toHaveBeenCalledTimes(1);
    expect(handleBorrow).toHaveBeenCalledWith('b-test-1');
  });

  it('nút "Mượn" bị disabled khi available === 0', () => {
    const handleBorrow = jest.fn();
    const handleReturn = jest.fn();

    render(
      <BookItem
        book={mockOutOfStockBook}
        isBorrowed={false}
        onBorrow={handleBorrow}
        onReturn={handleReturn}
      />
    );

    expect(screen.getByText('Hết bản')).toBeInTheDocument();
    const borrowBtn = screen.getByRole('button', { name: /hết sách/i });
    expect(borrowBtn).toBeDisabled();
  });

  it('khi sách đang mượn (isBorrowed = true) thì hiển thị nút "Trả sách" và click gọi onReturn', async () => {
    const user = userEvent.setup();
    const handleBorrow = jest.fn();
    const handleReturn = jest.fn();

    render(
      <BookItem
        book={mockBook}
        isBorrowed={true}
        onBorrow={handleBorrow}
        onReturn={handleReturn}
      />
    );

    const returnBtn = screen.getByRole('button', { name: /trả sách/i });
    expect(returnBtn).toBeInTheDocument();
    expect(returnBtn).toHaveClass('btn-return--highlight');
    expect(screen.getByText('Bạn đang mượn')).toBeInTheDocument();

    await user.click(returnBtn);

    expect(handleReturn).toHaveBeenCalledTimes(1);
    expect(handleReturn).toHaveBeenCalledWith('b-test-1');
  });

  it('khi đã mượn tối đa 3/3 cuốn (isLimitReached = true), nút "Mượn" bị disabled như hết sách', () => {
    const handleBorrow = jest.fn();
    const handleReturn = jest.fn();

    render(
      <BookItem
        book={mockBook}
        isBorrowed={false}
        isLimitReached={true}
        onBorrow={handleBorrow}
        onReturn={handleReturn}
      />
    );

    const limitBtn = screen.getByRole('button', { name: /đạt giới hạn \(3\/3\)/i });
    expect(limitBtn).toBeInTheDocument();
    expect(limitBtn).toBeDisabled();
    expect(limitBtn).toHaveClass('btn-disabled');
  });
});
