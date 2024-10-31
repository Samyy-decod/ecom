import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";



const UpdateProduct = () => {

    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error:updateError, isUpdated } = useSelector((state) => state.deshbordproducts);

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();  // Get the product ID from the URL

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones"];
 
  //^--------------------------UPDATEE-PRODUCT-----------------------------
   
    useEffect(() => {
     
      if (!product || product._id !== id) {
        dispatch(getProductDetails(id));
      } else {
     
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.stock);
        setOldImages(product.image);  
      }
    }, [dispatch, id, product]);

   
    useEffect(() => {
      if (isUpdated) {
        alert.success("Product Updated Successfully");
        dispatch(getProductDetails(id));
        navigate("/admin/products"); 
        dispatch({ type: UPDATE_PRODUCT_RESET });
      }
    }, [isUpdated, alert, navigate, dispatch,id]);


    useEffect(() => {
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
    }, [updateError, error, alert, dispatch]);

  
    useEffect(() => {
      return () => {
        setName("");
        setDescription("");
        setPrice(0);
        setCategory("");
        setStock(0);
        setImages([]);
        setOldImages([]);
        setImagesPreview([]);
      };
    }, []);

    
    const updateProductSubmitHandler = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("stock", stock);

      
      images.forEach((image) => {
        myForm.append("images", image);
      });

      dispatch(updateProduct(id, myForm));
      console.log("createProduct->", id, myForm);
    };

    const updateProductImagesChange = (e) => {
      const files = Array.from(e.target.files);

      setImages([]);
      setImagesPreview([]);
      setOldImages([]);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
        setImages((old) => [...old, file]);
      });
    };

    return (
      <Fragment>
        <MetaData title="Update Product" />
        <div className="dashboard">
          <SideBar />
          <div className="newProductContainer">
            <form className="createProductForm" encType="multipart/form-data" onSubmit={updateProductSubmitHandler}>
              <h1>UPDATE Product</h1>

              {/* Product Name */}
              <div>
                <SpellcheckIcon />
                <input type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              {/* Product Price */}
              <div>
                <AttachMoneyIcon />
                <input type="number" placeholder="Price" value={price} required onChange={(e) => setPrice(e.target.value)} />
              </div>

              {/* Product Description */}
              <div>
                <DescriptionIcon />
                <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="1"></textarea>
              </div>

              {/* Product Category */}
              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Stock */}
              <div>
                <StorageIcon />
                <input type="number" placeholder="Stock" value={stock} required onChange={(e) => setStock(e.target.value)} />
              </div>

              {/* File Input for Images */}
              <div id="createProductFormFile">
                <input type="file" name="avatar" accept="image/*" onChange={updateProductImagesChange} multiple />
              </div>

              {/* Old Image Preview */}
              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="Old Product Preview" />
                  ))}
              </div>

              {/* New Image Preview */}
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              {/* Submit Button */}
              <Button id="createProductBtn" type="submit" disabled={loading}>
                Update
              </Button>

        
            </form>
          </div>
        </div>
      </Fragment>
    );
};

export default UpdateProduct;
