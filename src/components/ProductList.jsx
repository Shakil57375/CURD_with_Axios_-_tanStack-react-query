import { useState } from "react";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
  );
  return response.data;
};

const ProductList = ({ onShowDetails, onGetPreviousProduct }) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["products", { page }]),
  });

  
  if (error) return <div>An error ocurred: {error.message}</div>;

  return (
    <div className="">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 my-2 text-center">
        Product List
      </h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products?.data &&
          products?.data.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              onShowDetails={onShowDetails}
              handleDelete={handleDelete}
              onEdit={onGetPreviousProduct}
              isLoading={isLoading}
            />
          ))}
      </ul>
      <div className="flex justify-between items-center">
        {products?.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products?.prev)}
          >
            <div className="flex items-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>{" "}
              <p>Prev</p>
            </div>
          </button>
        )}
        {products?.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products?.next)}
          >
            <div className="flex items-center">
              <p>Next</p>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
