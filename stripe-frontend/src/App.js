import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name: "Razvi Service",
    price: 10,
    productBy: "razvi"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type":"application/json"
    }

    return fetch(`http://localhost:8282/payment`,{
      method:"POST",
      headers,
      body: JSON.stringify(body)
    })
    .then(response => {
      console.log("Response",response)
      const {status} = response
      console.log("Status", status);
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
          <StripeCheckout 
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            token={makePayment}
            name="Razvi Service"
            amount={product.price * 100}
            currency="inr"
            shippingAddress
          >
            <button className="btn-large blue">Buy Razvi Service for just Rs. {product.price}</button>
          </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
