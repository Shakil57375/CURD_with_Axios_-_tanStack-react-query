import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomInput from "./CustomInput";

const AddProduct = () => {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["products"]);
    },
    onMutate: (variables) => {
      return { greeting: "Say hello" };
    },
  });

  const submitData = (event) => {
    event.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
    setState({
      title: "",
      description: "",
      price: 0,
      rating: 5,
      thumbnail: "",
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }
  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  return (
    <div className="">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 my-2">Add a Product</h2>
      {mutation.isSuccess && <p>Product Added!</p>}
      <form className="flex flex-col gap-5" onSubmit={submitData}>
        <CustomInput
          label="Title"
          value={state.title}
          name="title"
          onInputChange={handleChange}
          placeholder=""
          type="text"
        />

        <CustomInput
          label="Description"
          value={state.description}
          name="description"
          onInputChange={handleChange}
          placeholder=""
          type="text"
        />

        <CustomInput
          label="Price"
          value={state.price}
          name="price"
          onInputChange={handleChange}
          placeholder=""
          type="number"
        />

        <CustomInput
          label="Thumbnail URL"
          value={state.thumbnail}
          name="thumbnail"
          onInputChange={handleChange}
          placeholder=""
          type="text"
        />

        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
