import "./App.css";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
    console.log(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleSelectedPage = (selectedPage) => {
    setPage(selectedPage)
  }
  return (
    <div className="app">
      {products.length > 0 && <div className="products">
        {products.slice(page*10-10,page*10).map((prod) => {
          return <span className="products__single" key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} />
            <span>
              {prod.title}
            </span>
          </span>
        })}
      </div>}
      {
        products.length > 10 && <div className="pagination">
          <span onClick={()=>setPage(prev => prev - 1)} className={page<2? "disable": ""}>⬅️</span>
          {
            [...Array(products.length / 10)].map((_,i)=>(
              <span onClick={()=>handleSelectedPage(i+1)} className={page === i+1 ? "color": ""}>{i+1}</span>
            ))
          }
          <span onClick={()=>setPage(prev => prev + 1)} className={ page>9? "disable": ""}>➡️</span>
        </div>
      }
    </div>
  );
}
