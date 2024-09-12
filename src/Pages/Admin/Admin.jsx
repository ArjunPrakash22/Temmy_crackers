// Admin.jsx
import React, { useState } from 'react';
import adminlogo from '../../Assets/Pictures/logo2.png';
import './Admin.css';
import { ProductTable, EditModal, BillModal } from '../../Widget';
import { product_list } from '../../Constants/Products'; // Replace with actual data for orders
import { Link } from 'react-router-dom';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('product');
    const [showModal, setShowModal] = useState(false);
    const [showBillModal, setShowBillModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [billData, setBillData] = useState(null);
    const [isProduct, setIsProduct] = useState(true);

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
        { field: 'name', header: 'Customer Name' },
        { field: 'city', header: 'City' },
        { field: 'state', header: 'State' },
        { field: 'product', header: 'Products' },
        { field: 'date', header: 'Date' },
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
    

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    const handleEditProduct = (rowData) => {
        setIsProduct(true);
        setEditData(rowData);
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
        setIsProduct(false);
        setEditData({
            name: '',
            city: '',
            state: '',
            product: '',
            date: '',
            bill: '',
        });
        setShowModal(true);
    };

    const handlePreviewBill = (rowData) => {
        setBillData(rowData);
        setShowBillModal(true);
    };

    const handleSave = (updatedData) => {
        console.log('Updated Data:', updatedData);
        setShowModal(false);
    };

    return (
        <div className="admin-sec">
            <div className="admin-logo-cont">
                <img className="admin-logo-img" src={adminlogo} alt="Admin Logo" />
            </div>
            <h1 className="admin-h1">ADMIN PANEL</h1>
            <Link to="/login" className="logout-btn">LOG OUT</Link>

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
                        <div className="product_table">
                            <ProductTable columns={productColumns} data={product_list} onEdit={handleEditProduct} />
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
                            <ProductTable columns={orderColumns} data={product_list} onEdit={handleEditOrder} />
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
