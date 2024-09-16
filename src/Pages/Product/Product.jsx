import React, { useEffect, useState } from "react";
import "./Product.css";
import { Navbar } from "../../Component";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";

const Product = () => {
  const [products, setProducts] = useState([
    // { id: 1, name: "2 3/4 inch Kuruvi", actualRate: 36, discountRate: 9, quantity: 0 },
    // { id: 2, name: "3 1/2 inch Lakshmi crackers", actualRate: 60, discountRate: 15, quantity: 0 },
    // { id: 3, name: "4 inch Lakshmi crackers", actualRate: 80, discountRate: 20, quantity: 0 },
    // { id: 4, name: "4 inch Gold Lakshmi crackers", actualRate: 120, discountRate: 30, quantity: 0 },
    // { id: 5, name: "4 inch Delux Lakshmi crackers", actualRate: 132, discountRate: 33, quantity: 0 },
  ]);
  const [category, setCategory] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(productsCollectionRef, orderBy("id"));
        const querySnapshot = await getDocs(q);
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
    name: "",
    city: "",
    state: "",
    address: "",
    phoneNumber: "",
    email: "",
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
      [name]: value,
    });
  };

  // Calculate total price for each product (discount rate * quantity)
  const calculateTotal = (product) => product.discountRate * product.quantity;

  // Calculate total discount for all products
  const totalDiscountAmount = products.reduce((acc, product) => {
    if (product.actualRate && product.discountRate) {
      return (
        acc + (product.actualRate - product.discountRate) * product.quantity
      );
    }
    return acc;
  }, 0);

  // Calculate total amount after discount for all products
  const totalAmountAfterDiscount = products.reduce(
    (acc, product) => acc + product.discountRate * product.quantity,
    0
  );

  const handleSubmit = async () => {
    const { name, city, state, address, phoneNumber, email } = formDetails;
    setValidationErrors("");

    if (!name || !city || !state || !phoneNumber || !email) {
      setValidationErrors("Please fill in all the required fields.");
      return;
    }

    const status = "pending";
    const date = new Date().toDateString();
    const ordersCollectionRef = collection(db, "orders");
    const q = query(ordersCollectionRef, orderBy("id", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    const firstDoc = querySnapshot.docs[0];
    const lastID = firstDoc.data().id;
    const id = lastID + 1;

    const subject = `Order details Order id:${id} and Order name:${name}`;

    // Format the email body
    

      const productList = products
      .filter(product => product.quantity !== 0)
      .map(product => {
        const namePadded = product.name.padEnd(30, ' ');
        const quantityPadded = String(product.quantity).padStart(8, ' '); // Adjust padding as needed
        const pricePadded = '₹' + String(calculateTotal(product)).padStart(12, ' '); // Adjust padding as needed
        return `| ${namePadded} | ${quantityPadded} | ${pricePadded} |`;
      })
      .join('\n');
    
    const body = `
    TEMMY CRACKERS 

    Order ID: ${id}
    Name: ${name}
    City: ${city}
    State: ${state}
    Address: ${address}
    Phone Number: ${phoneNumber}
    
    Ordered Products:
    
    --------------------------------------------------------------------------
    | Product Name                 | Quantity | Total Price                 |
    --------------------------------------------------------------------------
    ${productList}
    --------------------------------------------------------------------------
    
    Amount Saved: ₹${totalDiscountAmount}
    Total Amount: ₹${totalAmountAfterDiscount.toFixed(2)} 
    
    
    `;
    const mailtoLink = `mailto:Rathan.industries.svks@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const Products = products
      .filter((product) => product.quantity !== 0)
      .reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});

    try {
      const id = lastID + 1;
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
        Products,
      });

      setFormDetails({
        name: "",
        city: "",
        state: "",
        address: "",
        phoneNumber: "",
        email: "",
      });

      // Encode the HTML body
      window.location.href = mailtoLink;
      // Optionally refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1-second delay to ensure email client has time to open
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to place the order. Please try again.");
    }
  };

  const isAnyProductSelected = products.some((product) => product.quantity > 0);

  const renderProductRows = () => {
    let currentCategory = null;

    return products.map((product, index) => {
      const isNewCategory = product.category !== currentCategory;
      currentCategory = product.category;

      return (
        <React.Fragment key={product.id}>
          {isNewCategory && (
            <tr className="comp_tr category-row">
              <td colSpan="7" className="category-header">
                {product.category}
              </td>
            </tr>
          )}
          <tr className="comp_tr">
            <td className="comp_td">{product.id}</td>
            <td className="comp_td">{product.name}</td>
            <td className="comp_td">
              <s>{product.actualRate}</s>
            </td>
            <td className="comp_td">{product.discountRate}</td>
            <td className="comp_td">
              <input
                type="number"
                value={product.quantity}
                className="quantity"
                min="0"
                onChange={(e) =>
                  handleQuantityChange(product.id, parseInt(e.target.value))
                }
              />
            </td>
            <td className="comp_td">{calculateTotal(product)}</td>
          </tr>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="product-sec">
      <Navbar />
      <p className="product-head">PRODUCT</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="comp-table-sec">
        <table className="comp_table">
          <thead className="comp_thead">
            <tr className="comp_tr thead">
              <th className="comp_th">S.No</th>
              <th className="comp_th">Name of the Product</th>
              <th className="comp_th">Marked Price</th>
              <th className="comp_th">Our Price</th>
              <th className="comp_th">Quantity</th>
              <th className="comp_th">Total Price</th>
            </tr>
          </thead>
          <tbody>{renderProductRows()}</tbody>
          <tfoot>
            <tr className="comp_tr">
              <td
                className="comp_td"
                colSpan="5"
                style={{ textAlign: "right" }}
              >
                Saved Amount:
              </td>
              <td className="comp_td">₹{totalDiscountAmount}</td>
            </tr>
            <tr className="comp_tr">
              <td
                className="comp_td"
                colSpan="5"
                style={{ textAlign: "right" }}
              >
                Total Amount
              </td>
              <td className="comp_td">₹{totalAmountAfterDiscount}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Form to capture user details */}
      {/* Form to capture user details */}
      <div className="form-container">
        <div className="form-section">
          <h3 className="form-title">ORDER DETAILS</h3>
          {validationErrors && (
            <p className="error-message">{validationErrors}</p>
          )}

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formDetails.name}
              onChange={handleInputChange}
              disabled={!isAnyProductSelected}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">City</label>
            <input
              className="form-input"
              type="text"
              name="city"
              placeholder="Enter your city"
              value={formDetails.city}
              onChange={handleInputChange}
              disabled={!isAnyProductSelected}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">State</label>
            <input
              className="form-input"
              type="text"
              name="state"
              placeholder="Enter your state"
              value={formDetails.state}
              onChange={handleInputChange}
              disabled={!isAnyProductSelected}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              className="form-input"
              type="text"
              name="address"
              placeholder="Enter your address (optional)"
              value={formDetails.address}
              onChange={handleInputChange}
              disabled={!isAnyProductSelected}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              className="form-input"
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formDetails.phoneNumber}
              onChange={handleInputChange}
              disabled={!isAnyProductSelected}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formDetails.email}
              onChange={handleInputChange}
              disabled={!isAnyProductSelected}
              required
            />
          </div>

          <button
            type="button"
            className="form-submit-btn"
            onClick={handleSubmit}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
