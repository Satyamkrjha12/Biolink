import React, { useRef, useState, useEffect } from "react";

export default function ProfileUpdate({ sendDataParent , Info}) {
  const [data, updateData] = useState({
    Name: "",
    Bio: "",
    Img: "/default img/default-profimg.jpg",
  });

  const fileInputRef = useRef();

  useEffect(() => {
  updateData({
    Name: Info.Name || "",
    Bio: Info.Bio || "",
    Img: Info.Image && Info.Image !== "" 
      ? Info.Image 
      : "/default img/default-profimg.jpg",
  });
}, [Info]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = { ...data, Img: reader.result };
        updateData(newData);         // ✅ safe: inside FileReader callback
        sendDataParent(newData);     // ✅ send after image is read
      };
      reader.readAsDataURL(file);    // 🔄 start reading
    } else {
      alert("Please select a valid image file");
    }
  };




  const handleChange = (event) => {
    const { name, value } = event.target;
    updateData((prevData) => {
      const newData = { ...prevData, [name]: value };
      sendDataParent(newData);
      return newData;
    });
  };

  return (
    <div>
      <form className="max-w-md mx-auto">
        {/* Image Uploader */}
        <div className="relative z-0 w-full mb-5 group">
          <div className="flex flex-col items-center">
            <img
              src={data.Img}
              alt="Profile"
              onClick={() => fileInputRef.current.click()}
              className="w-32 h-32 rounded-full object-cover cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <p className="text-sm mt-2 text-gray-500">Click image to update</p>
          </div>
        </div>

        {/* Name Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="Name"
            id="floating_name"
            value={data.Name}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        {/* Bio Field */}
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="Bio"
            id="floating_bio"
            value={data.Bio}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_bio"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Bio
          </label>
        </div>
      </form>
    </div>
  );
}
