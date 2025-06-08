import axios from "axios";
import { useEffect, useState } from "react";
import ChatBot from "./ChatBot";
import Search from "./Search";

interface Product {
  id: number;
  name: string;
  price: string;       // price comes as string from backend
  description: string;
  image_url: string;   // matches backend key
  category: string;
  stock: number;
}

// Helper function to transform both array and object formats into Product
const transformProduct = (item: any): Product => {
  if (Array.isArray(item)) {
    // For array format (from /search endpoint)
    return {
      id: item[0],
      name: item[1],
      description: item[2],
      price: item[3],
      category: item[4],
      stock: item[5],
      image_url: item[6],
    };
  } else {
    // For object format (from /products/all endpoint)
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      stock: item.stock,
      image_url: item.image_url,
    };
  }
};

const Prodects = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products/all");
        const transformedProducts: Product[] = response.data.map(transformProduct);
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch products by category or search query
  const fetchProductCategory = async (category: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/search?query=${category}`);
      const transformedProducts: Product[] = response.data.map(transformProduct);
      setProducts(transformedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <div>
        <Search onSearch={fetchProductCategory} />
      </div>
       <div className="fixed bottom-4 right-4 z-50 shadow-xl border rounded-xl overflow-hidden bg-white">
  <ChatBot />
</div>

      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-green-500 font-bold">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Prodects;
