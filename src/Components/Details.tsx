import { Link, useParams } from "react-router-dom";
import sunglasses from "../Products/Products";
import { BsArrowLeft } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import NotificationAdded from "./NotificationAdded";
import { useCart } from "../Hooks/useCart";
import { useFav } from "../Hooks/useFav";
import { Products } from "../Interface/Products";

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "", 10);
  const product = sunglasses.find((item) => item.id === productId);

  const backUp = () => {
    window.history.back();
  };

  const { addToCart, isOnCart, allProducts } = useCart();
  const { addToFav, allFavProducts } = useFav();

  const toggleFav = () => {
    addToFav(product as Products);
  };
  const productFav = allFavProducts.find((p) => p.id === productId);
  const productCart = allProducts.find((p) => p.id === productId);
  const similarProducts = sunglasses.filter(
    (item) => item.shape === product?.shape && item.id !== product?.id
  );

  if (!product) {
    return (
      <div className="text-black dark:text-white w-full h-full flex flex-col gap-y-3 justify-center items-center">
        <p className="text-3xl">No se encontró el producto:(</p>
        <Link
          to={"/"}
          className="px-4 py-2 border border-black dark:border-white hover:scale-110 transition"
        >
          Sigue explorando más productos
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 items-center justify-center mt-32 w-[90%] md:w-[70%] mx-auto relative">
        <div className="col-span-4 text-black dark:text-white flex flex-row items-center justify-between text-sm md:text-base cursor-pointer transition">
          <div>
            <Link to={"/"} className="text-black/60 dark:text-white/60">
              Inicio /
            </Link>{" "}
            <Link
              to={`/${product.category}`}
              className="text-black/60 dark:text-white/60"
            >
              {product.category} /{" "}
            </Link>
            {product.brand}
          </div>
          <div
            className="flex flex-row gap-2 items-center cursor-pointer border-black hover:border-black dark:hover:border-white border-transparent border-b"
            onClick={backUp}
          >
            <BsArrowLeft />
            <p>Regresar</p>
          </div>
        </div>
        <div className="size-[300px] md:size-[500px] flex mx-auto items-center justify-center col-span-4 md:col-span-3 cursor-zoom-in">
          <img src={product.image} alt="" />
        </div>
        <div className="text-black dark:text-white flex flex-col gap-4 items-start justify-start col-span-4 md:col-span-1">
          <div className="flex flex-row justify-between items-center w-full list-none">
            <span className="uppercase text-white dark:text-black py-1 px-4 bg-black dark:bg-white rounded-full font-semibold text-xs">
              Solo en línea
            </span>
            <li>
              <AiFillHeart
                id="fav-icon"
                className={`size-6 cursor-pointer active:scale-125 duration-500 ${
                  productFav ? "text-red-500" : "text-black dark:text-white"
                }`}
                onClick={toggleFav}
              />
            </li>
          </div>
          <p className="font-bold text-base md:text-xl ">{product.brand}</p>
          <p className="font-light text-base underline">
            {product.description}
          </p>
          <p className="font-light text-xl">${product.price}.00 mx</p>
          <div className="flex gap-4">
            <button
              className="bg-black/60 hover:bg-black transition dark:bg-white/80 dark:hover:bg-white text-white dark:text-black text-xs 
              font-medium py-2 px-6 rounded-full"
              onClick={() => addToCart(product as Products)}
            >
              {productCart ? "En el carrito!" : "Añadir al carrito"}
            </button>
          </div>
        </div>
      </div>
      <div className="text-black dark:text-white w-[90%] md:w-[70%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 mt-20 md:mt-0">
        {similarProducts.length > 0 ? (
          <p className="text-xl col-span-2 md:col-span-4 border-b-[1px] border-black/50 dark:border-white/50 pb-5">
            Tambien te podría interesar
          </p>
        ) : (
          <p className="text-xl col-span-2 md:col-span-4 flex justify-center items-center py-10 border-y-[1px] border-black/50 dark:border-white/50">
            Lo sentimos, por el momento no hay productos similares
          </p>
        )}
        {similarProducts.slice(0, 4).map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="mt-2 text-white bg-[#f6f6f6] dark:bg-black/80 rounded-sm hover:shadow-2xl dark:hover:shadow-lg hover:shadow-black/40 
                dark:hover:shadow-white/20 border-[0.5px] border-black/10 hover:border-black/25 dark:border-white/10 dark:hover:border-white/20 
                flex-flex-col relative [&>div>img]:hover:scale-100 p-2 md:p-5 [&>div>#description]:hover:font-bold cursor-pointer h-full w-full 
                opacity-85 hover:opacity-100 transition col-span-1"
          >
            <div className="absolute top-0 flex w-full justify-center">
              <div
                className="left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(245,245,245,0)] to-[rgba(245,245,245,0)  
                    dark:from-[rgba(17,17,17,0)] via-neutral-800 dark:via-white dark:to-[rgba(17,17,17,0)] transition-all duration-1000"
              />
            </div>
            <div className="size-[100px] md:size-[200px] mx-auto flex items-center justify-center">
              <img src={item.image} alt={item.description + "image"} />
            </div>
            <p className="text-black/60 dark:text-white/60 text-xs md:text-base font-semibold">
              {item.brand}
            </p>
            <p className="text-black dark:text-white font-semibold text-xs md:text-lg">
              {item.description}
            </p>
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs font-extrabold text-black dark:text-white">
                ${item.price}.00 mx
              </p>
            </div>
          </Link>
        ))}
      </div>

      {isOnCart && (
        <NotificationAdded
          isAdded={isOnCart}
          addedText={"Añadido al carrito correctamente"}
        />
      )}
    </>
  );
}
