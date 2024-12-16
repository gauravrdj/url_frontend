import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export function Home(){
    const [name, setName]=useState('');
    const navigate=useNavigate();
    return (
        <div>
          <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4">Welcome😊</h1>
            <p className="text-lg mb-8">Go to <i className="text-blue-500">/your_name</i> and add your profile...</p>
            <h1>OR</h1>
            <input 
              type="text" 
              placeholder="Enter Your first Name" 
              className="px-4 py-2 m-4 border rounded-md bg-gray-800 text-gray-100 focus:outline-none"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              onClick={() => {
                // window.location.href = `/${name}`;
                navigate(`/${name}`);
              }}
            >
              Get Started
            </button>
          </div>
          <footer className="bg-gray-900 text-white text-center py-4">
            <p>&copy; 2024 <Link to={"https://www.linkedin.com/in/gaurav-sharma-9556b2196/"}>Gaurav Sharma</Link>. All rights reserved.</p>
          </footer>
        </div>
      );
}