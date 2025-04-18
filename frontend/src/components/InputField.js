// src/components/InputField.js

export default function InputField({ label, type, id, placeholder, value, onChange }) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
