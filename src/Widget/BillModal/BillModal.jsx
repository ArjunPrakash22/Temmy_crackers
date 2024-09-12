// BillModal.jsx
import React from 'react';
import './BillModal.css'; // Add your styles

const BillModal = ({ show, onClose, billData }) => {
    const handlePrint = () => {
        // Trigger the print dialog
        window.print();
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Receipt</h2>
                <div className="bill-details">
                    <p><strong>Order ID:</strong> {billData?.id}</p>
                    <p><strong>Customer Name:</strong> {billData?.name}</p>
                    <p><strong>City:</strong> {billData?.city}</p>
                    <p><strong>State:</strong> {billData?.state}</p>
                    <p><strong>Products:</strong> {billData?.product}</p>
                    <p><strong>Date:</strong> {billData?.date}</p>
                    <p><strong>Bill Amount:</strong> {billData?.bill}</p>
                </div>
                <button className="print-btn" onClick={handlePrint}>
                    Print Receipt
                </button>
            </div>
        </div>
    );
};

export default BillModal;
