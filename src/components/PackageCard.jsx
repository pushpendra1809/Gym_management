import React from "react";

const PackageCard = ({ Package, deletePackage }) => {

  return (
    <>
      <div className="grid grid-cols-1 min-w-60 max-w-96 min-h-80 p-5 bg-[#006d77] my-3 shadow-lg rounded-lg text-white transition-transform ease-in duration-200 transform hover:scale-105 ">
        <div className="border-b-2 border-slate-400 px-3 pb-4 mb-4 text-center font-bold">
          <h1 className="text-2xl">{Package.name}</h1>
          <p>Price: ${Package.price}/m</p>
        </div>
        <div className="mb-5 p-2 h-52 overflow-y-auto">
          <p>{Package.description}</p>
        </div>
        <div className="flex justify-center ">
          <button className="bg-red-500 h-10 w-1/2 hover:bg-red-600 text-center px-3 py-1 rounded" onClick={()=>deletePackage(Package.id)}>
            delete
          </button>
        </div>
      </div>
    </>
  );
};

export default PackageCard;
