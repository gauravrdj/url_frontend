import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'


const InputPage = () => {
    const {username}=useParams();
    const [profile, setProfile] = useState('');
    const [profileLink, setProfileLink] = useState('');

    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here
             const res=await axios.post('https://url-backend-xzs6.onrender.com/profile', {
                name:username,
                profile:profile,
                url:profileLink
             })
             if(res.data.status===200){
                alert(`Your ${profile} profile is now accessible at /${username}/${profile}`);
             }
        console.log("Profile:", profile);
        console.log("Profile Link:", profileLink);
    };

    return (
        <div>
            {/* Main content */}
            <div className="min-h-screen bg-gray-800 flex flex-col justify-between">
                <nav className="bg-gray-800 py-4">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center">
                            <div className="flex-shrink-0">
                                <span className="text-white text-lg font-semibold">Access your Profile</span>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="flex-grow flex justify-center items-center">
                    <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Hi {username}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="profile" className="block text-gray-300 font-semibold mb-2">Profile</label>
                                <input 
                                    type="text" 
                                    id="profile" 
                                    className={`w-full px-4 py-2 border rounded-md bg-gray-800 text-gray-100 focus:outline-none 
                                        ${isInputFocused ? 'border-blue-500' : 'border-gray-500'}`}
                                    placeholder="Enter your profile name"
                                    value={profile}
                                    onChange={(e) => setProfile(e.target.value)}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="profileLink" className="block text-gray-300 font-semibold mb-2">Profile Link</label>
                                <input 
                                    type="text" 
                                    id="profileLink" 
                                    className={`w-full px-4 py-2 border rounded-md bg-gray-800 text-gray-100 focus:outline-none 
                                        ${isInputFocused ? 'border-blue-500' : 'border-gray-500'}`}
                                    placeholder="Enter your profile link"
                                    value={profileLink}
                                    onChange={(e) => setProfileLink(e.target.value)}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                {/* Footer */}
                <footer className="bg-gray-800 py-4 text-white text-center">
                    Made by Gaurav Sharma (NIT RKL)
                </footer>
            </div>
        </div>

    );
};

export default InputPage;
