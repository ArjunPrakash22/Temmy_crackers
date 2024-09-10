import React, { useState } from 'react';
import adminlogo from '../../Assets/Pictures/logo2.png';
import './Admin.css';
import { ProductTable } from '../../Widget';
import { product_list } from '../../Constants/Products';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('product'); // State to track active tab

    const column = [
        { field: 'id', header: 'Sno' },
        { field: 'name', header: 'Name of the product' },
        { field: 'actualRate', header: 'Actual Rate' },
        { field: 'discountRate', header: '75% Discount Rate' },
        { field: 'per', header: 'Per' },
        { field: 'edit' }
    ];

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='admin-sec'>
            <div className='admin-logo-cont'>
                <img className='admin-logo-img' src={adminlogo} alt="Admin Logo" />
            </div>
            <h1 className='admin-h1'>ADMIN PANEL</h1>
            <Link to="/login" className="logout-btn">LOG OUT</Link>

            {/* Tab navigation */}
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

            {/* Conditional Rendering of Tabs */}
            <div className="tab-content">
                {activeTab === 'product' && (
                    <div className='product_list_tab'>
                        <p className='product_head'>Product Management:</p>
                        <div className='product_table'>
                            <ProductTable columns={column} data={product_list} />
                        </div>
                    </div>
                )}
                
                {activeTab === 'order' && (
                    <div className='order_list_tab'>
                        <p className='product_head'>Order Management:</p>
                        <div className='product_table'>
                            {/* Replace with order data */}
                            <ProductTable columns={column} data={product_list} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
