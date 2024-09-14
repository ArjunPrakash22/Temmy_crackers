import React, { useState, useEffect } from 'react';
import './EditModal.css'; // Ensure you have proper styling for the modal

const EditModal = ({ show, onClose, data, onSave, isProduct }) => {
    const defaultFormData = isProduct
        ? { name: '', actualRate: '', discountRate: '', category: '', per: '' }
        : { date:'', name: '', phoneno: '', email: '', city: '', state: '', date: '', status: '', Products: '', bill: '' };

    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (data) {
            setFormData(data);
        } else {
            setFormData(defaultFormData);
        }
    }, [data, isProduct]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-head">{isProduct ? 'Edit Product' : 'Edit Order'}</h2>
                <form onSubmit={handleSubmit}>
                    {isProduct ? (
                        <>
                            <label className="modal-label">
                                Product ID:
                                <input
                                    className="modal-input"
                                    type="number"
                                    name="product_id"
                                    value={formData.id || ''}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </label>
                            <label className="modal-label">
                                Product Name:
                                <input
                                    className="modal-input"
                                    type="text"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="modal-label">
                                Actual Rate:
                                <input
                                    className="modal-input"
                                    type="number"
                                    name="actualRate"
                                    value={formData.actualRate || ''}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="modal-label">
                                Discount Rate:
                                <input
                                    className="modal-input"
                                    type="number"
                                    name="discountRate"
                                    value={formData.discountRate || ''}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="modal-label">
                                Category:
                                <input
                                    className="modal-input"
                                    type="text"
                                    name="category"
                                    value={formData.category || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="modal-label">
                                Per:
                                <input
                                    className="modal-input"
                                    type="text"
                                    name="per"
                                    value={formData.per || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <label className="modal-label">
                                Customer Name:
                                <input
                                    className="modal-input"
                                    type="text"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="modal-label">
                                Phone No.:
                                <input
                                    className="modal-input"
                                    type="text"
                                    name="phone_no"
                                    value={formData.phoneNumber || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="modal-label">
                                Email ID:
                                <input
                                    className="modal-input"
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="modal-label">
                                City:
                                <input
                                    className="modal-input"
                                    type="text"
                                    name="city"
                                    value={formData.city || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="modal-label">
                                State:
                                <input
                                    className="modal-input"
                                    type="text"
                                    name="state"
                                    value={formData.state || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="modal-label">
                                Status:
                                <select
                                    className="modal-input"
                                    name="status"
                                    value={formData.status || 'pending'}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </label>
                            <label className="modal-label">
                                Bill Amount:
                                <input
                                    className="modal-input"
                                    type="number"
                                    name="bill"
                                    value={formData.totalAmountAfterDiscount || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </>
                    )}

                    <div className="modal-actions">
                        <button className="btn submit-btn" type="submit">Save</button>
                        <button className="btn cancel-btn" type="button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
