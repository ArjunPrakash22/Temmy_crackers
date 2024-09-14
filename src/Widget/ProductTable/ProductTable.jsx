import React from 'react';
import './ProductTable.css'; // Ensure correct path to CSS file

const ProductTable = ({ columns, data, onEdit }) => {
    const renderHeader = () => {
        return columns.map((col) => (
            <th className='comp_th' key={col.field}>{col.header || col.field}</th>
        ));
    };

    const renderBody = () => {
        return data.map((row) => (
            <tr className='comp_tr' key={row.id}>
                {columns.map((col) => (
                    <td className='comp_td' key={col.field}>
                        {col.field === 'edit' ? (
                            <button className='edit-btn-admin' onClick={() => onEdit(row)}>Edit</button>
                        ) : (
                            row[col.field] || (col.render ? col.render(row) : '')
                        )}
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <div className='comp_table'>
            <table>
                <thead>
                    <tr className='comp_tr'>{renderHeader()}</tr>
                </thead>
                <tbody>{renderBody()}</tbody>
            </table>
        </div>
    );
};

export default ProductTable;
