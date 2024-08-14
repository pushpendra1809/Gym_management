import {useState} from 'react'
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { toast } from 'react-toastify';
const PackageForm = ({closePopup,getPackages}) => {
  const [formData,setFormData] = useState({name: "", description: "", price: 0});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData:", formData);
      await addDoc(collection(db, "Packages"), {
        name: formData.name,
        price: formData.price,
        description: formData.description,
      });
      getPackages();
      toast.success("Package added successfully!!", { position: "top-center" });
      closePopup();
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  return (
    <div
      className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-10"
      onClick={closePopup}
    >
      
      <div
        className="bg-white p-10 rounded shadow-lg max-w-lg w-full overflow-y-auto h-[400px] "
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="text-slate-500">
          <div>
            <label className="block m-1 ">Package Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Package Name"
            />
          </div>
          <div>
            <label className="block m-1 ">Description</label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="block border w-96 px-3 py-2 h-24 rounded mb-3 hover:ring-2"
              placeholder="Description"
            />
          </div>
          <div>
            <label className="block m-1 ">Phone Number</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Price"
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 w-20"
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 w-20"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PackageForm