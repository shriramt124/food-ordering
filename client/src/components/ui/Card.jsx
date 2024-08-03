 

function Card({product}) {
  return (
    <div
    key={product._id}
    className="bg-slate-900 text-slate-200 rounded-lg flex flex-col  "
  >
    <div className="rounded-xl">
      <img
        src={product.prodImage}
        alt=""
        className="w-full rounded-bl-[60px] hover:scale-[1.01] transition-all duration-300"
      />
    </div>
    <div className="flex flex-col gap-4 relative capitalize px-[10px] py-[20px] ">
      <div className="flex justify-start flex-col  gap-4 ">
        <h1 className="capitalize text-xl font-semibold ">
          {product.title}
        </h1>
        <p className="">{product.description}</p>
      </div>
      <div className="flex justify-between items-center ">
        <p className="  text-xl text-slate-200  transition-all duraion-300">
         ${product.price}
        </p>
        <button className="bg-orange-500 px-2 py-2 text-xl rounded-full text-white hover:bg-orange-800 transition-all duraion-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  )
}

export default Card