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
      <table className="border-collapse table-fixed border w-full">
        <thead>
          <tr className="border">
            {columnHeaders.map((header) => (
              <th key={header.key} className='border text-sm'>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex + 'row'} className="">
              {Object.keys(row).map((key) => (
                <td key={key + rowIndex} className='border p-1 text-sm'>
                  {
                    <input
                      className="bg-gray-50 dark:bg-gray-100 border border-gray-300 rounded-md p-0 w-full"
                      type={properties[key].inputType}
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
      <button type="button" className='add-row-button text-sm rounded-md border dark:bg-white dark:text-black p-1 m-1' onClick={handleAddRow}>add row +</button>
    </div>
  );
};

export default ArrayInputField;