import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createVegetable } from "./apiFarmer";

const AddVegetable = () => {
    const [values, setValues] = useState({
        item_name: "",
        price: "",
        quantity: "",
        farmer_id:" ",
        photo: "",
        loading: false,
        error: "",
        createdVegetable: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();

    const {
        item_name,
        price,
        quantity,
        farmer_id,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createVegetable(user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    item_name: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>


            <div className="form-group">
                <label>Item name</label>
                <input
                    onChange={handleChange("item_name")}
                    type="text"
                    className="form-control"
                    placeholder="Item name"
                    value={item_name}
                />
            </div>

            <div className="form-group">
                <label >Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label >Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <h4>Upload Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>
            <div className="form-check">
                <input
                    onChange={handleChange("farmer_id")}
                    type="checkbox"
                    className="form-check-input"
                    value={`${user._id}`}
                />
                <label className="form-check-label" > Confirm</label>
            </div>

            <button className="btn btn-outline-primary">Add Vegetable</button>
        </form>
    );


    return(
        <Layout
            title="Add a new vegetable"
            description={`Helloo ${user.name}, ready to add a new vegetable?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                   {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddVegetable;