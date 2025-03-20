import React from 'react';

interface ArrayInputFieldProps {
  properties: Record<string, any>;
  data: Record<string, string>[];
  onChange: (data: Record<string, string>[]) => void

}

const ArrayInputField: React.FC<ArrayInputFieldProps> = ({ properties, data, onChange }) => {

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
    <div className="input-table">
      <table className="border border-collapse w-full">
        <thead>
          <tr className="text-sm border border-black">
            {columnHeaders.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex + 'row'}>
              {Object.keys(row).map((key) => (
                <td key={key + rowIndex} className='p-1'>
                  {
                    <input
                      className="md:col-span-1 bg-gray-100 dark:bg-gray-400 border border-gray-300 rounded-md p-0"
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
      <button type="button" className='add-row-button text-sm rounded-md bg-black text-white p-1 m-1' onClick={handleAddRow}>add row +</button>
    </div>
  );
};

export default ArrayInputField;