import React, { useEffect, useState } from 'react';
import './Product.css'; 
import { Navbar } from '../../Component';
import { collection,doc,setDoc, addDoc, getDocs,query,where,orderBy,limit } from "firebase/firestore";
import { db } from '../../firebase';

const Product = () => {
  const [products, setProducts] = useState([
    // { id: 1, name: "2 3/4 inch Kuruvi", actualRate: 36, discountRate: 9, quantity: 0 },
    // { id: 2, name: "3 1/2 inch Lakshmi crackers", actualRate: 60, discountRate: 15, quantity: 0 },
    // { id: 3, name: "4 inch Lakshmi crackers", actualRate: 80, discountRate: 20, quantity: 0 },
    // { id: 4, name: "4 inch Gold Lakshmi crackers", actualRate: 120, discountRate: 30, quantity: 0 },
    // { id: 5, name: "4 inch Delux Lakshmi crackers", actualRate: 132, discountRate: 33, quantity: 0 },
  ]);
  const [category, setCategory] = useState(''); 

  const productsCollectionRef=collection(db,'products');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productsCollectionRef);
        const jsonObjects = [];

        querySnapshot.forEach((doc) => {
          if (doc.id != 0) {
            var productdata = doc.data();
            productdata.quantity = 0;
            jsonObjects.push(productdata);
          }
        });

        // Filter products based on category
        const filteredProducts = jsonObjects.filter((product) => 
          product.category.toLowerCase().includes(category.toLowerCase())
        );
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchProducts();
  }, [category]);
  

  const [formDetails, setFormDetails] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
    phoneNumber: '',
    email: ''
  });

  const handleQuantityChange = (id, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value
    });
  };

  // Calculate total price for each product (discount rate * quantity)
  const calculateTotal = (product) => product.discountRate * product.quantity;

  // Calculate total discount for all products
  const totalDiscountAmount = products.reduce(
    (acc, product) => acc + (product.actualRate - product.discountRate) * product.quantity,
    0
  );

  // Calculate total amount after discount for all products
  const totalAmountAfterDiscount = products.reduce(
    (acc, product) => acc + product.discountRate * product.quantity,
    0
  );

  const handleSubmit = async () => {
    const { name, city, state, address, phoneNumber, email } = formDetails;
  
    // Construct the order details for the email body in plain text format
    const subject = `Order Details for ${name}`;
    let productDetails = products
      .filter(product => product.quantity !== 0)
      .map(product => 
        `${product.name} - Quantity: ${product.quantity}, Total Price: ₹${calculateTotal(product)}`
      ).join('\n');
  
    const body = `
      Name: ${name}
      City: ${city}
      State: ${state}
      Address: ${address}
      Phone Number: ${phoneNumber}
    
      Ordered Products:
      Product Name             Quantity        Total Price
      ------------------       --------        ------------
      ${productDetails}
    
      Amount Saved: ₹${totalDiscountAmount}
      Total Amount: ₹${totalAmountAfterDiscount}
    `;
  
    const Products = products
      .filter((product) => product.quantity !== 0)
      .reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});
  
    const status = "pending";
    const date = new Date().toDateString();
    const ordersCollectionRef = collection(db, 'orders');
    const q = query(ordersCollectionRef, orderBy("id", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    const firstDoc = querySnapshot.docs[0];
    const lastID = firstDoc.data().id;
  
    try {
      const id = (lastID + 1);
      await setDoc(doc(db, "orders", id.toString()), {
        id,
        name,
        email,
        city,
        state,
        address,
        phoneNumber,
        totalDiscountAmount,
        totalAmountAfterDiscount,
        status,
        date,
        Products
      });
  
      // Clear the form fields after submission
      setFormDetails({
        name: '',
        city: '',
        state: '',
        address: '',
        phoneNumber: '',
        email: ''
      });
  
      // Open the default email client with the formatted text email
      const mailtoLink = `mailto:Rathan.industries.svks@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
  
      // Refresh the page after a short delay to ensure email client opens
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1-second delay to ensure email client has time to open
  
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to place the order. Please try again.");
    }
  };
  
  
  
  
  

  return (
    <div className='product-sec'>
      <Navbar />
      <p className='product-head'>PRODUCT</p>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by Category" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="search-input"
        />
      </div>
      <div className='comp-table-sec'>
      <table className='comp_table'>
        <thead className='comp_thead'>
          <tr className='comp_tr thead'>
            <th className='comp_th'>S.No</th>
            <th className='comp_th'>Name of the Product</th>
            <th className='comp_th'>Category</th>
            <th className='comp_th'>Marked Price</th>
            <th className='comp_th'>Our Price</th>
            <th className='comp_th'>Quantity</th>
            <th className='comp_th'>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='comp_tr'>
              <td className='comp_td'>{product.id}</td>
              <td className='comp_td'>{product.name}</td>
              <td className='comp_td'>{product.category}</td>
              <td className='comp_td'><s>{product.actualRate}</s></td> {/* Strikethrough for actual rate */}
              <td className='comp_td'>{product.discountRate}</td> {/* Discount rate is current price */}
              <td className='comp_td'>
                <input
                  type="number"
                  value={product.quantity}
                  min="0"
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                />
              </td>
              <td className='comp_td'>{calculateTotal(product)}</td> {/* Total price = discountRate * quantity */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='comp_tr'>
            <td className='comp_td' colSpan="5" style={{ textAlign: 'right' }}>Saved Amount:</td>
            <td className='comp_td'>₹{totalDiscountAmount}</td>
          </tr>
          <tr className='comp_tr'>
            <td className='comp_td' colSpan="5" style={{ textAlign: 'right' }}>Total Amount</td>
            <td className='comp_td'>₹{totalAmountAfterDiscount}</td>
          </tr>
        </tfoot>
      </table>
      </div>

      {/* Form to capture user details */}
      <div className='form-sec-cont'>
      <div className="form-section">
        <h3>FILL THE DETAILS</h3>
        <input className="product-input"
          type="text"
          name="name"
          placeholder="Name"
          value={formDetails.name}
          onChange={handleInputChange}
          required
        />
        <input className="product-input"
          type="text"
          name="city"
          placeholder="City"
          value={formDetails.city}
          onChange={handleInputChange}
          required
        />
        <input className="product-input"
          type="text"
          name="state"
          placeholder="State"
          value={formDetails.state}
          onChange={handleInputChange}
          required
        />
        <input className="product-input"
          type="text"
          name="address"
          placeholder="Address (optional)"
          value={formDetails.address}
          onChange={handleInputChange}
        />
        <input className="product-input"
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formDetails.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <input className="product-input"
          type="email"
          name="email"
          placeholder="Email "
          value={formDetails.email}
          onChange={handleInputChange}
          required
        />

        <button type="button" className="product-submit" onClick={handleSubmit}>
          Place Order
        </button>
      </div>
      </div>
    </div>
  );
};

export default Product;
