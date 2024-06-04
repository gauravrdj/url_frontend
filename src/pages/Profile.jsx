import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'




const InputPage = () => {
    const navigate=useNavigate()
    const {username, newUser}=useParams();
    const [profile, setProfile] = useState('');
    const [profileLink, setProfileLink] = useState('');
    const [live, setLive]=useState('');
    // const [authenticated, setAuthenticated]=useState(false);
    const [password, setPassword]=useState('');
    


    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // let authenticated=false;
        // Handle form submission here
        let message;
        newUser==='true' ? message="Generate a Password, so that no one except you can add profile in your account" : message="Enter the Password"
        const inputPassword=prompt(message);
        console.log(inputPassword);
        setPassword(inputPassword);
        let authenticated=false;
        if(newUser==='true'){
            if(inputPassword!=null){
            const pass=await axios.post('https://url-backend-xzs6.onrender.com/api/v1/user/password' ,{
                username:username,
                password:inputPassword
            })
            if(pass.data.status===200){
                authenticated=true;
            }
        }
        else{
            alert('Password cannot be NULL❌')
            navigate(`/add/${username}/${newUser}`);
        }
        }
        else{
            const verified=await axios.post('https://url-backend-xzs6.onrender.com/api/v1/user/verify', {
                username:username,
                password:inputPassword
            })
            // console.log(verified)
            if(verified.data.status===200){
                authenticated=true;
            }
            else{
                alert('Authentication Failed❌')
                navigate(`/add/${username}/${newUser}`);
            }
        }
        
      
        // console.log(authenticated)
        if(authenticated){
             const res=await axios.post('https://url-backend-xzs6.onrender.com/profile', {
                name:username,
                profile:profile, 
                url:profileLink
             })
             if(res.data.status===200){
                // alert(`Your ${profile} profile is now accessible at /${username}/${profile}`);
                setLive(`Your ${profile} profile is now live at /${username}/${profile} 🎉`);
             }
             setTimeout(()=>{
                
                navigate(`/${username}/${profile}`);
             }, 3000);
            }
            
        // console.log("Profile:", profile);
        // console.log("Profile Link:", profileLink);
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


                        {/* {newUser===true ? null : (<div className={"mb-4 p-4 rounded-md bg-green-500 text-white"}>
                                It seems You are already registered, keep adding new profiles😉
                            </div>)} */}

                            <div className={`mb-4 p-4 rounded-md ${newUser==='true' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {newUser==='true' ?  'It seems you are a new user, thanks for visiting👍' : 'It seems you are already registered, keep adding new profiles😉'}
                            </div>

                            
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
                                    type="url" 
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
                           <br />
                           <br />

                            {live.length===0 ? null : <div className={"mb-4 p-4 rounded-md  bg-green-500 text-white"}>{live}</div>}
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
