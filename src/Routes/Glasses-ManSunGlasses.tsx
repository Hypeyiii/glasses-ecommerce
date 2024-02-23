import { manSunGlasses } from "../Products/Products-ManSunGlasses";
import ProductItem from "../Components/ProductItem.tsx";

interface Sunglass {
  id: number;
  brand: string;
  price: number;
  image: string;
  description: string;
}

interface SunGlassesProps {
  addToCart: (sunglass: Sunglass) => void;
  showDetails: (sunglass: Sunglass) => void;
}

const SunGlasses: React.FC <SunGlassesProps>= ({ addToCart, showDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-32 relative w-[95%] mx-auto">
      <p className="col-span-1 md:col-span-3 text-2xl text-black dark:text-white font-semibold">
        Lentes de hombre
      </p>
      {manSunGlasses.map((sunglass) => (
        <>
          <ProductItem
            key={sunglass.id}
            brand={sunglass.brand}
            id={sunglass.id}
            price={sunglass.price}
            image={sunglass.image}
            description={sunglass.description}
            addedToCart={() => addToCart(sunglass)}
            showDetails={() => showDetails(sunglass)}
          />
        </>
      ))}
    </div>
  );
}
export default SunGlasses;
