import React, { useEffect, useState } from 'react'
import { callIcon, eyeHideIcon, eyeShowIcon, logo, mailIcon, passwordIcon, userIcon } from '../Assets/Index'
import { useNavigate } from 'react-router-dom';
import { loginPostApi } from '../Services/Apicalling/AuthApi';
import TorshMessage from '../Components/TorshMessage';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState();
    const [logintoken, setLogintoken] = useState(false)



    const [torsh, setTorsh] = useState(false)








    const [loginData, setLoginData] = useState({});
    const handleInputChange = (e) => {
        setError('')
        setTorsh(false)
        setMessage('')
        const { name, value } = e.target;
        setLoginData((prevState) => ({ ...prevState, [name]: value.trim() }));

    };

    const showHide = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setTorsh(true)
            navigate('/');
            window.location.reload();
        } else {
            navigate('/login');
        }
    }, [logintoken])


    const handlelogin = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Function to validate and submit login data
        const validateAndSubmit = async () => {
            console.log({ loginData });
            try {
                const postapi = await loginPostApi(loginData);
                if (postapi.status === 200) {
                    if (postapi.data.data.user.role === 'admin') {
                        setError(false);
                        setMessage(postapi.data.message);
                        localStorage.setItem("token", postapi.data.data.token);
                        setLogintoken(true)

                    } else {
                        setError(true);
                        setTorsh(true)
                        setMessage("Access denied");
                    }
                } else {

                    if (postapi.response.data.errors.length != 0) {
                        setError(true);
                        setTorsh(true)
                        setMessage(
                            postapi.response.data.errors.map((e, index) => (
                                <React.Fragment key={index}>
                                    {e.message}
                                    <br />
                                </React.Fragment>
                            ))
                        );
                    } else {
                        setError(true);
                        setTorsh(true)
                        setMessage("something went wrong");
                    }
                }
            } catch (error) {
                setError(true);
                setTorsh(true)
                setMessage("something went wrong");
            }
        };

        if (loginData.phone_number.length !== 10) {
            setTorsh(true)
            setError('phone_number');
            setMessage('Please Enter 10 digit phone number');
        } else if (!loginData.password) {
            setTorsh(true)
            setError('password');
            setMessage('Please Enter password');
        }
        else if (loginData.password.length < 8) {
            setTorsh(true)
            setError('password');
            setMessage('Please Enter minimam 8 digit password');
        }

        else {
            validateAndSubmit();
        }
    };








    // 9887381847
    return (
        <>
            <TorshMessage error={error} message={message} torsh={torsh} setTorsh={setTorsh} />
            <div className='d-flex justify-content-center  align-items-center w-100' style={{ height: '100vh' }}>
                <div className=' p-4 border-color shadow rounded mx-3 border-color' >
                    <div className='text-center d-flex justify-content-around align-items-center text-color mb-2'>
                        <img src={logo} width={80} height={80} alt="logo" className=' rounded' />
                        <h3 className='m-0 '>Boiler Plate</h3>
                    </div>
                    <form onSubmit={handlelogin}>
                        <div className=' text-color'>
                            <label htmlFor="PhoneNumber" classname="form-label">Phone Number</label>
                            <div className={`input-group mb-3 mt-1 rounded `}>
                                <span className="input-group-text" id="basic-addon"><img src={callIcon} alt="call" /></span>
                                <input
                                    type="number"
                                    className={`form-control focus-ring focus-ring-light text-color ${error == "phone_number" && 'border border-danger'}`}
                                    id='PhoneNumber'
                                    placeholder="Phone Number"
                                    name='phone_number'
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                        if (e.target.value.length >= 10 && e.key !== 'Backspace' && e.key !== 'Delete') {
                                            e.preventDefault();
                                        }
                                    }}
                                    required
                                />
                            </div>
                            {/* <label htmlFor="mail" classname="form-label">email</label>
                        <div className={`input-group mb-3 mt-1 rounded `}>
                            <span className="input-group-text" id="basic-addon"><img src={mailIcon} alt="email" /></span>
                            <input
                                type="email"
                                className={`form-control focus-ring focus-ring-light text-color ${error == "email" && 'border border-danger'}`}
                                id='PhoneNumber'
                                placeholder="Email"
                                name='email'
                                onChange={handleInputChange}
                                required
                            />
                        </div> */}
                            <label htmlFor="password" className="form-label m-0">Password</label>
                            <div className={`input-group mb-3 mt-1 rounded `}>
                                <span className="input-group-text" id="basic-addon"><img src={passwordIcon} alt="password" /></span>
                                <input
                                    type={!showPassword ? 'text' : 'password'}
                                    className={`form-control focus-ring focus-ring-light text-color ${error == "password" && 'border border-danger'} `}
                                    name='password'
                                    id='password' placeholder="Password"
                                    onChange={handleInputChange}
                                    maxLength={16}
                                    required
                                />
                                <span className="input-group-text" id="basic-addon">
                                    <a className='color cursor-pointer' onClick={showHide}>{showPassword ? <img src={eyeHideIcon} alt="hide" /> : <img src={eyeShowIcon} alt="show" />}</a>
                                </span>
                            </div>
                            {/* <p className={`${error ? 'text-danger' : 'text-success'}`}>{message}</p> */}
                        </div>
                        <div className='m-4 mb-2'>
                            <button className={`buttons  w-100 mb-2 `} type="submit" >Login</button>
                        </div>

                    </form>


                </div>
            </div>
        </>
    )
}

export default Login