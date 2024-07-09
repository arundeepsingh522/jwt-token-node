import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign up</h2>
        <form className="space-y-6">
          {[
            { id: 'fullName', label: 'Full Name', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'password', label: 'Password', type: 'password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password' }
          ].map((field) => (
            <div key={field.id} className="relative z-0">
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                className="peer block w-full px-4 py-2 mt-1 text-gray-700 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                value={formData[field.id]}
                onChange={handleChange}
                required
                placeholder=" " // Important for floating label to work
              />
              <label
                htmlFor={field.id}
                className="absolute left-3 -top-2 text-gray-600 text-sm transition-all transform scale-75 origin-top-left bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:scale-75 peer-focus:-top-2 peer-focus:text-indigo-600"
              >
                {field.label}
              </label>
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="text-xs text-center text-gray-600">
          By signing up, you agree to the{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Log in
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
