import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import CartPage from './CartPage';

type Book = {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  pageCount: number;
  price: number;
};

type CartItem = {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
};

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5068/Bookstore')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error loading books:', error);
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const categories = ['All', ...new Set(books.map((b) => b.classification))];

  const sortedBooks = useMemo(() => {
    const copiedBooks = [...books];
    copiedBooks.sort((a, b) => {
      if (sortAscending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    return copiedBooks;
  }, [books, sortAscending]);

  const filteredBooks = useMemo(() => {
    if (selectedCategory === 'All') return sortedBooks;

    return sortedBooks.filter(
      (b) => b.classification === selectedCategory
    );
  }, [sortedBooks, selectedCategory]);

  const addToCart = (book: Book) => {
    const existingItem = cart.find((item) => item.bookID === book.bookID);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.bookID === book.bookID
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      const newItem: CartItem = {
        bookID: book.bookID,
        title: book.title,
        price: book.price,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  };

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  return showCart ? (
    <CartPage
      cart={cart}
      onContinueShopping={() => setShowCart(false)}
    />
  ) : (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Online Bookstore</h1>

      <div className="text-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowCart(true)}
        >
          View Cart
        </button>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div
            id="book-list"
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div>
              <label className="me-2">Books per page:</label>
              <select
                value={booksPerPage}
                onChange={(e) => {
                  setBooksPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="form-select d-inline-block w-auto"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>

            <div>
              <label className="me-2">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="form-select d-inline-block w-auto"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setSortAscending(!sortAscending)}
            >
              Sort by Title: {sortAscending ? 'A-Z' : 'Z-A'}
            </button>
          </div>

          {currentBooks.map((book) => (
            <div key={book.bookID} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{book.title}</h3>
                <p className="card-text mb-1"><strong>Author:</strong> {book.author}</p>
                <p className="card-text mb-1"><strong>Publisher:</strong> {book.publisher}</p>
                <p className="card-text mb-1"><strong>ISBN:</strong> {book.isbn}</p>
                <p className="card-text mb-1">
                  <strong>Category:</strong>{' '}
                  <span className="badge bg-secondary">{book.classification}</span>
                </p>
                <p className="card-text mb-1"><strong>Pages:</strong> {book.pageCount}</p>
                <p className="card-text"><strong>Price:</strong> ${book.price.toFixed(2)}</p>

                <button
                  className="btn btn-success mt-2"
                  onClick={() => addToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              className="btn btn-outline-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <p className="text-center">
            🛒 Cart Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </p>

          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Cart Summary</h4>

              <div className="alert alert-success" role="alert">
                You have {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart!
              </div>

              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.bookID} className="mb-2">
                      <p className="mb-1">
                        <strong>{item.title}</strong>
                      </p>
                      <p className="mb-1">Quantity: {item.quantity}</p>
                      <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                      <p className="mb-1">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <hr />
                    </div>
                  ))}

                  <p>
                    <strong>
                      Total: $
                      {cart
                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                        .toFixed(2)}
                    </strong>
                  </p>

                  <button
                    className="btn btn-outline-primary mt-2"
                    onClick={() =>
                      document.getElementById('book-list')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    Continue Shopping
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;