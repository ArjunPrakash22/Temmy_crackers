import React from 'react';
import './BillModal.css'; 
import adminlogo from '../../Assets/Pictures/logo2.png';

const BillModal = ({ show, onClose, billData }) => {
    const handlePrint = () => {
        // Trigger the print dialog
        window.print();
    };

    if (!show) return null;
    console.log(billData.Products[billData.id]);

    const saved=0;

    // Extract products from billData
    const products = typeof billData.Products === 'object' && billData.Products !== null
        ? Object.values(billData.Products || {}) 
        : [];
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="admin-logo-cont">
                    <img className="admin-logo-img" src={adminlogo} alt="Admin Logo" />
                </div>
                <p>66-G,Gandhi Road,Mani Nagar,Sivakasi - 626123</p>
                <p>Phone no.: +91 6380519757</p>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2 className='h2'>Receipt</h2>
                <div className="bill-details">
                    <div className="bill-details1">
                        <div className="bill-col1">
                            <p><strong>Order ID:</strong> {billData?.id}</p>
                            <p><strong>Customer Name:</strong> {billData?.name}</p>
                        </div>
                        <div className="bill-col2">
                            <p><strong>City:</strong> {billData?.city}</p>
                            <p><strong>State:</strong> {billData?.state}</p>
                        </div>
                    </div>
                    <div className='address-bill-div'>
                        <p className="address-bill"><strong>Address:</strong> {billData?.address}</p>
                        <p><strong>Date:</strong> {billData?.date}</p>
                    </div>
                    
                </div>
                {/* Check if products array is valid */}
                {products.length > 0 && (
                    <div className="product-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    {/* <th>Discount</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => {
                                    // Calculate the total price after discount
                                    const amt = (product.discountRate*product.quantity) ;
                                    return (
                                        <tr key={index}>
                                            <td>{product.name}</td>
                                            <td>{product.quantity}</td>
                                            <td>{amt}</td>
                                            {/* <td>{product.discountRate}%</td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <p className='total-amt'><strong>BILL AMOUNT:</strong> {billData?.totalAmountAfterDiscount}</p>
                    </div>
                )}
                <button className="print-btn" onClick={handlePrint}>
                    Print Receipt
                </button>
            </div>
        </div>
    );
};

export default BillModal;
