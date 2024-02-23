import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import { useState } from "react";
import EditProduct from "./components/EditProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
function App() {
  const [showDetails, setShowDetails] = useState(19);
  const [post, setPost] = useState(null);
  const queryClient = useQueryClient();
  const handleShowDetails = (id) => {
    setShowDetails(id);
  };

  const handleGetPreviousProduct = (updatedProduct) => {
    setPost(updatedProduct);
  };

  const handleUpdate = (updatedProduct) => {
    mutation.mutate(updatedProduct);
  };

  const mutation = useMutation({
    mutationFn: (updatedProduct) =>
      axios.patch(
        `http://localhost:3000/products/${updatedProduct.id}`,
        updatedProduct
      ),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["products"]);
    },
    onMutate: (variables) => {
      return { greeting: "Say hello" };
    },
  });
  return (
    <div className="flex justify-between px-10">
      <div className="basis-2/12 sticky top-2 self-start">
        {!post ? (
          <AddProduct />
        ) : (
          <EditProduct post={post} setPost = {setPost} onUpdate={handleUpdate} />
        )}
      </div>
      <div className="basis-7/12">
        <ProductList onGetPreviousProduct={handleGetPreviousProduct} onShowDetails={handleShowDetails} />
      </div>
      <div className="basis-3/12 sticky top-2 self-start">
        <ProductDetails id={showDetails} />
      </div>
    </div>
  );
}

export default App;
