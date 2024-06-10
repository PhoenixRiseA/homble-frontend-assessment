import { useParams } from "react-router-dom";
import { useRequest } from "../../hooks";
import './ProductDetail.css';
import DismissibleAlert from "../Alert/Alert";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";
const ProductDetail = () => {
  const params = useParams();
  const { loading, data, error } = useRequest("/products");
  const {productImage, description, cost_price, selling_price, cooking_instruction, name, allergen_info }= data?.filter((item) => item.id === params?.id)?.[0] ?? {productImage:'', description:'', cost_price:'', selling_price:'', cooking_instruction:'', name:'', allergen_info:'' };

  // use  useParam to retrieve product id, call the /product/:id end point and display the relevant product

  if(loading){
    return <ProductDetailSkeleton/>
  }
  return (
    <div className="container mt-5">
       {error && <DismissibleAlert message={error} type={'danger'} />}
    <div className="card product-card">
        <img src={productImage} alt={description} className="card-img-top" />
        <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <h5 className="card-title text-primary">{selling_price}₹</h5>
            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="true"
                    aria-controls="flush-collapseOne"
                  >
                    Description
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                //   data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    {description}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Allergen-Info
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                //   data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    {allergen_info}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Usage Instructions
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                //   data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    {cooking_instruction}
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</div>
  );
};
export default ProductDetail;
