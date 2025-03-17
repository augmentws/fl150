import React from 'react';

interface ArrayInputFieldProps {
  properties: Record<string, any>;
  data: Record<string, string>[];
  onChange: (data: Record<string, string>[]) => void

}

const ArrayInputField: React.FC<ArrayInputFieldProps> = ({ properties, data , onChange }) => {

  const fieldNames: string[] = properties ? Object.keys(properties).filter(key => properties[key]) : [];  
  const columnHeaders = fieldNames.map(key => ({
    key: key,
    label: properties[key].label || key
  }));

  const handleAddRow = () => {
      onChange([...data, Object.fromEntries(fieldNames.map((name) => [name, '']))])
  };  

  
  
  const handleChange = (rowIndex: number, fieldName: string, value: string) => {
    const updatedRows = data.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [fieldName]: value };
      }
      return row;
    });
    onChange(updatedRows);
  };
  return (
    <div>
    <table>
      <thead>
        <tr>
          {columnHeaders.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))} 
        </tr>
      </thead>
      <tbody>        
        {data.map((row, rowIndex) => (
          <tr key={rowIndex+'row'}>
            {Object.keys(row).map((key) => (
              <td key={key+rowIndex}>
                {
                  <input
                    type="text"
                    value={row[key]}
                    onChange={(e) => handleChange(rowIndex, key, e.target.value)}
                    />
                }
            </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
     <button type="button" onClick={handleAddRow}>add row +</button>
     </div>
  );
};

export default ArrayInputField;