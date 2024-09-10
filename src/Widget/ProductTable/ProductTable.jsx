import React from "react";
import "./ProductTable.css";
const ProductTable = ({
  data = null,
  columns = null,
  
  // hover = true,
  // striped = true,
}) => {
  const getCaps = (head, field) => {
    if (head) return head.toUpperCase();
    return field.toUpperCase();
  };
  return (
    <div>
      <table className="comp_table">

        <tr className="comp_tr">
          {columns &&
            columns.map((head) => <th className="comp_th">{getCaps(head.header, head.field)}</th>)}
        </tr>

        {data &&
          data.map((row) => (
        <tr className="comp_tr"/*className={`${hover && "hover"} ${striped && "striped"}`}*/>
              {columns.map((col) => (
            <td className="comp_td">{row[col.field]}</td>
              ))}
        </tr>
       
        ))}
        
      </table>
      {data ? null : <p>No Row to show :</p>}
    </div>
  );
};

export default ProductTable;
