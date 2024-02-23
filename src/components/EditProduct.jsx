import { useState, useEffect } from "react";
import CustomInput from "./CustomInput";

const EditProduct = ({ post, onUpdate }) => {
  const [state, setState] = useState(post);

  useEffect(() => {
    setState(post);
  }, [post]);

  const submitData = (event) => {
    event.preventDefault();
    onUpdate(state);
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
  
  return (
    <div className="">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 my-2">Edit a Product</h2>
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
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
