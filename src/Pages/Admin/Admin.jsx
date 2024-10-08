// Admin.jsx
import React, { useState,useEffect } from 'react';
import adminlogo from '../../Assets/Pictures/logo2.png';
import './Admin.css';
import { ProductTable, EditModal, BillModal } from '../../Widget';
import { product_list } from '../../Constants/Products'; // Replace with actual data for orders
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { collection,doc,setDoc,updateDoc, addDoc, getDocs,query,where,orderBy,limit,deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('product');
    const [showModal, setShowModal] = useState(false);
    const [showBillModal, setShowBillModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [billData, setBillData] = useState(null);
    const [isProduct, setIsProduct] = useState(true);
    const [searchCategory, setSearchCategory] = useState('');
const location=useLocation();
    const { key } = location.state || {}; 
    const [products, setProducts] = useState([
        // { id: 1, name: "2 3/4 inch Kuruvi", actualRate: 36, discountRate: 9, quantity: 0 },
        // { id: 2, name: "3 1/2 inch Lakshmi crackers", actualRate: 60, discountRate: 15, quantity: 0 },
        // { id: 3, name: "4 inch Lakshmi crackers", actualRate: 80, discountRate: 20, quantity: 0 },
        // { id: 4, name: "4 inch Gold Lakshmi crackers", actualRate: 120, discountRate: 30, quantity: 0 },
        // { id: 5, name: "4 inch Delux Lakshmi crackers", actualRate: 132, discountRate: 33, quantity: 0 },
      ]);

    const [orders, setOrders]=useState([])

    const navigate = useNavigate();

    const productsCollectionRef=collection(db,'products');
    const ordersCollectionRef=collection(db,'orders');

    const productColumns = [
        { field: 'id', header: 'Sno' },
        { field: 'name', header: 'Name of the product' },
        { field: 'actualRate', header: 'Actual Rate' },
        { field: 'discountRate', header: '75% Discount Rate' },
        { field: 'per', header: 'Per' },
        { field: 'category', header: 'Category' },
        { field: 'edit', header: 'Actions' }, // Ensure 'edit' column has a header
    ];
    
    const orderColumns = [
        { field: 'id', header: 'Order ID' },
        { field: 'date', header: 'Date' },
        { field: 'name', header: 'Customer Name' },
        { field: 'phoneNumber', header: 'Phone no.' },
        { field: 'email', header: 'Email id' },
        { field: 'city', header: 'City' },
        { field: 'state', header: 'State' },
        { field: 'status', header: 'Status' },
        
        {
            field: 'bill',
            header: 'Bill',
            render: (rowData) => (
                <button className='bill-btn-admin' onClick={() => handlePreviewBill(rowData)}>
                    Preview Bill
                </button>
            ),
        },
        { field: 'edit', header: 'Actions' }, // Ensure 'edit' column has a header
    ];

    const fetchProducts = async () => {
        try {
          const q = query(productsCollectionRef, orderBy('id'));
          const querySnapshot = await getDocs(q);
          const jsonObjects = [];
  
          querySnapshot.forEach((doc) => {
            if (doc.id != 0) {
              var productdata=doc.data()
              productdata.quantity=0;
              jsonObjects.push(productdata); 
            }
          });
    
          setProducts(jsonObjects);
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
      };

      const fetchOrders = async () => {
        try {
        const q = query(ordersCollectionRef, orderBy('id'));
        const querySnapshot = await getDocs(q);
      
          const jsonOrderObjects = [];
  
          querySnapshot.forEach((doc) => {
            if (doc.id != 0) {
              var orderdata=doc.data()
              jsonOrderObjects.push(orderdata); 
            }
          });
    
        setOrders(jsonOrderObjects)
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
      };

    useEffect(() => {
        if (!location.state || !location.state.key) {
            window.history.pushState(null, null, "/login");
            window.history.replaceState(null, null, "/login");
            navigate('/login');
          }
        fetchProducts();
        fetchOrders();
      }, []);
    

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    const handleEditProduct = (rowData) => {
        setIsProduct(true);
        setEditData(rowData);
        console.log(rowData)
        setShowModal(true);
    };

    const handleAddProduct = () => {
        setIsProduct(true);
        setEditData({
            name: '',
            actualRate: '',
            discountRate: '',
            category: '',
            per: '',
        });
        setShowModal(true);
    };

    const handleEditOrder = (rowData) => {
        setIsProduct(false);  
        setEditData(rowData);
        setShowModal(true);
    };

    const handleAddOrder = () => {
        navigate("/product")
        // setIsProduct(false);
        // setEditData({
        //     date: '',
        //     name: '',
        //     phoneno: '',
        //     email: '',
        //     city: '',
        //     state: '',
        //     product: '',
        //     bill: '',
        // });
        // setShowModal(true);
    };

    const handlePreviewBill = (rowData) => {
        setBillData(rowData);
        setShowBillModal(true);
    };

    const handleProductDelete = async (rowData) => {
        console.log("In delete product")
        try {
            // Delete product
            console.log("In try-if product",rowData.id)
            const docRef = doc(db, "products", rowData.id.toString());
            await deleteDoc(docRef);
            
            // Fetch updated data
            fetchProducts();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };
    const handleOrderDelete = async (rowData) => {
        console.log("In delete order")
        try {
            console.log("In try-if order",rowData.id)
                // Delete order
                const docRef = doc(db, "orders", rowData.id.toString());
                await deleteDoc(docRef);
            // Fetch updated data
            fetchOrders();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.category.toLowerCase().includes(searchCategory.toLowerCase())
    );
    
    const handleSave = async (updatedData) => {
        // console.log('Updated Data:', updatedData);
    
        if (isProduct) {
            const { id, name, actualRate, discountRate, category, per } = updatedData;
    
            try {
                if (id) {
                    const docRef = doc(db, "products", id.toString());
                    await updateDoc(docRef, {
                        id, 
                        name,
                        actualRate,
                        discountRate,
                        category,
                        per,
                    });
                } else {
                    const q = query(productsCollectionRef, orderBy("id", "desc"), limit(1));
                    const querySnapshot = await getDocs(q);
                    const firstDoc = querySnapshot.docs[0];
        
                    const lastID = firstDoc ? firstDoc.data().id : 0;
                    const newID = lastID + 1;
        
                    await setDoc(doc(db, "products", newID.toString()), {
                        id: newID,
                        name,
                        actualRate,
                        discountRate,
                        category,
                        per,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            const { id, date, name, phoneNumber, email, city, state, status,Products, totalAmountAfterDiscount } = updatedData;
            try {
                if (id) {
                    const docRef = doc(db, "orders", id.toString());
                    await updateDoc(docRef, {
                        date,
                        name,
                        phoneNumber,
                        email,
                        city,
                        state,
                        status,
                        Products,
                        totalAmountAfterDiscount,
                    });
                } else {
                    // Handle new order creation
                }
            } catch (error) {
                console.error(error);
            }
        }
    
        setShowModal(false);
        fetchProducts();
        fetchOrders();
    };
    
    

    const logout=()=>{
        window.history.pushState(null, null, "/");
        window.history.replaceState(null, null, "/");
        navigate("/");
    }

    return (
        <div className="admin-sec">
            <div className="admin-logo-cont">
                <img className="admin-logo-img" src={adminlogo} alt="Admin Logo" />
            </div>
            <h1 className="admin-h1">ADMIN PANEL</h1>
            <button type="submit" className="logout-btn" onClick={logout}>Logout</button>
            {/* <Link to="/login" className="logout-btn">LOG OUT</Link> */}

            <div className="tab-container">
                <div
                    className={`tab ${activeTab === 'product' ? 'active-tab' : ''}`}
                    onClick={() => handleTabSwitch('product')}
                >
                    Product Management
                </div>
                <div
                    className={`tab ${activeTab === 'order' ? 'active-tab' : ''}`}
                    onClick={() => handleTabSwitch('order')}
                >
                    Order Management
                </div>
            </div>

            <div className="tab-content">
            {activeTab === 'product' && (
                    <div className="product_list_tab">
                        <p className="product_head">Product Management:</p>
                        <button className="add-product-btn" onClick={handleAddProduct}>
                            + Add Product
                        </button>
                        <div className='search-container'>
                        <input
                            type="text"
                            placeholder="Search by category"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="search-input"
                        />
                        </div>

                        <div className="product_table">
                            <ProductTable
                                columns={productColumns}
                                data={filteredProducts} // Pass the filtered products
                                onEdit={handleEditProduct}
                                onDelete={handleProductDelete}
                            />
                        </div>
                    </div>
                )}
    {activeTab === 'order' && (
        <div className="order_list_tab">
            <p className="product_head">Order Management:</p>
            <button className="add-product-btn" onClick={handleAddOrder}>
                + Add Order
            </button>
            <div className="product_table">
                <ProductTable
                    columns={orderColumns}
                    data={orders}
                    onEdit={handleEditOrder}
                    onDelete={handleOrderDelete} // Pass onDelete function
                />
            </div>
        </div>
    )}
</div>


            <EditModal
                show={showModal}
                onClose={() => setShowModal(false)}
                data={editData}
                onSave={handleSave}
                isProduct={isProduct}
            />

            <BillModal
                show={showBillModal}
                onClose={() => setShowBillModal(false)}
                billData={billData}
            />
        </div>
    );
};

export default Admin;
