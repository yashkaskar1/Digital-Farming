import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [education, setEducation] = useState("")
  const [photo, setPhoto] = useState("")
  const [farmername, setFarmername] = useState("")
  const [farmerlocation, setFarmerlocation] = useState("")
  const [photopreview, setPhotopreview] = useState("")
  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPhotopreview(reader.result)
      setPhoto(file)
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('password', password)
    formData.append('role', role)
    formData.append('education', education)
    formData.append('photo', photo)
    try {
      const { data } = await axios.post('127.0.0.1:4001/api/users/register', formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
      );
      console.log(data)
      alert('user registerd succesfully')
      setName("")
      setEmail("")
      setPhone("")
      setPassword("")
      setRole("")
      setEducation("")
      setPhoto("")
      setPhotopreview("")

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg px-8'>
          <form onSubmit={handleRegister}>
            <div className='font-bold text-xl items-center text-center my-4'>
              Digital<span className='text-green-500'>Farming</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Register</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className='mb-4'>
              <input type='text' placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2  border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type='email' placeholder='Your Email Address' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2  border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type='number' placeholder='Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full p-2  border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type='password' placeholder='Your Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-2  border rounded-md' />
            </div>
            <select value={education} onChange={(e) => setEducation(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Your Location</option>
              <option value="Solapur">Solapur</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Baramati">Baramati</option>
              <option value="Amaravati">Amaravati</option>
              <option value="Kokan">Kokan</option>
            </select>
            <div className='flex items-center mb-4'>
              <div className='photo w-20 h-20 mr-4'>
                <img src={photopreview ? `${photopreview}` : "photo"} alt='photo' />
              </div>
              <input type='file' onChange={changePhotoHandler} className='w-full p-2  border rounded-md' />
            </div>
            <p className='text-center mb-4'>Already Registerd? <Link className="text-green-600">Login Now</Link></p>
            <button type='Submit' className='w-full p-2 bg-green-500 hover:bg-green-800 duration-300 rounded-md text-white mb-4'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register