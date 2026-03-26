type CartItem = {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
};

type CartPageProps = {
  cart: CartItem[];
  onContinueShopping: () => void;
};

const CartPage = ({ cart, onContinueShopping }: CartPageProps) => {
  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="card">
          <div className="card-body">
            {cart.map((item) => (
              <div key={item.bookID} className="mb-3">
                <h5>{item.title}</h5>
                <p className="mb-1">Quantity: {item.quantity}</p>
                <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                <p className="mb-1">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <hr />
              </div>
            ))}

            <h4>Total: ${total}</h4>

            <button
              className="btn btn-outline-primary mt-3"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;