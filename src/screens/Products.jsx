import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "./modal/Modal";

import { usePostRequest, useRequest } from "../hooks";
import { Skeleton } from "./Skeleton/SkeletonCard";
import DismissibleAlert from "./Alert/Alert";
import { useNavigate } from "react-router-dom";
import { debounce } from "../utils";
import { Spinner } from "./Spinner/Spinner";
const Products = () => {
  const { loading, data, error } = useRequest("/products");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [allgInfo, setAllgInfo] = useState("");
  const postHook = usePostRequest("/products");
  const nameRef = useRef();
  const descRef = useRef();
  const allgInfoRef = useRef();
  useEffect(() => {
    if (postHook.data) {
      setName("");
      setDesc("");
      setAllgInfo("");
      nameRef.current.value = "";
      descRef.current.value = "";
      allgInfoRef.current.value = "";
    }
  }, [postHook.data]);
  const navigate = useNavigate();
  const ProductsMemo = useMemo(
    () =>
      data
        ?.sort((a, b) => a.selling_price - b.selling_price)
        .map(({ id, productImage, description, selling_price }) => {
          return (
            <div
              className="col"
              key={id}
              onClick={() => navigate(`/product/${id}`)}
            >
              <div className="card" style={{ cursor: "pointer" }}>
                <img src={productImage} alt={description} />
                <div className="card-body">
                  <h5 className="card-title text-primary">{selling_price}₹</h5>
                  <p className="card-text">{description}</p>
                </div>
              </div>
            </div>
          );
        }),
    [data]
  );
  if (loading) {
    return <Skeleton />;
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center py-2">
        <button
          type="button"
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#Modal"
        >
          Add Product
        </button>
        <Modal
          title="Add Product"
          children={
            <form
              className="row needs-validation"
              onSubmit={(e) => {
                e.preventDefault();
                postHook.postData({
                  name,
                  description: desc,
                  allergen_info: allgInfo,
                });
              }}
            >
              <div className="input-group input-group-md mb-3 has-validation">
                <span
                  className="input-group-text"
                  for="validationCustom01"
                  id="inputGroup-sizing-sm"
                >
                  Name
                </span>
                <input
                  ref={nameRef}
                  id="validationCustom01"
                  type="text"
                  className="form-control"
                  aria-label="name"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={debounce((e) => setName(e.target.value), 500)}
                  required
                />
                <div className="invalid-feedback">Please Enter a Name.</div>
              </div>
              <div className="input-group input-group-md mb-3 has-validation">
                <span for="validationCustom02" className="input-group-text">
                  Description
                </span>
                <textarea
                  ref={descRef}
                  className="form-control"
                  aria-label="Description"
                  onChange={debounce((e) => setDesc(e.target.value), 500)}
                  id="validationCustom02"
                  required
                ></textarea>
                <div className="invalid-feedback">
                  Please Enter Description.
                </div>
              </div>
              <div className="input-group input-group-md mb-3 has-validation">
                <span
                  for="validationCustom03"
                  className="input-group-text text-wrap"
                >
                  Allergen Info
                </span>
                <textarea
                  ref={allgInfoRef}
                  className="form-control"
                  aria-label="Allergen Info"
                  onChange={debounce((e) => setAllgInfo(e.target.value), 500)}
                  id="validationCustom03"
                  required
                ></textarea>
                <div className="invalid-feedback">
                  Please Enter a Allergen Info.
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <button className="btn btn-primary" type="submit">
                    {postHook.loading ? <Spinner /> : "Add Product"}
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          }
        />
      </div>
      {error && <DismissibleAlert message={error} type={"danger"} />}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-2">
        {ProductsMemo}
      </div>
    </div>
  );
};

export default memo(Products);
