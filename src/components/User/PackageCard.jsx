import React from "react";

const PackageCard = ({ Package, handlePackageChange, formData  }) => {

  const handleClick= ()=>{
    handlePackageChange(Package.id);
  }

  return (
    <>
      <div className={`grid cursor-pointer grid-cols-1 w-36 h-36 p-5 ${formData.packageId!=Package.id?"bg-slate-100 text-gray-600":"bg-blue-500 text-white"}  my-3 shadow-lg rounded-lg  text-md transition-transform ease-in duration-200 transform hover:scale-110 overflow-x-auto`} onClick={handleClick}>
        <div className="border-b-2 border-slate-400 px-3 pb-4 mb-4 text-center font-bold">
          <h1 className="text-md">{Package.name}</h1>
          <span className="text-[10px]">Price: ${Package.price}/m</span>
        </div>
        <div className="mb-5 p-1 text-[10px]">
          <p>{Package.description}</p>
        </div>
      </div>
    </>
  );
};

export default PackageCard;
