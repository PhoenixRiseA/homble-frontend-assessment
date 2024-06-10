import './ProductDetailSkeleton.css';
export const ProductDetailSkeleton = () =>{
    return (
        <div className="container mt-5">
        <div className="card product-detail-skeleton-card">
            <div className="product-detail-skeleton-img card-img-top"></div>
            <div className="card-body">
                <div className="product-detail-skeleton-title"></div>
                <div className="product-detail-skeleton-price"></div>
                <div className="product-detail-skeleton-text"></div>
                <div className="product-detail-skeleton-text"></div>
                <div className="product-detail-skeleton-text"></div>
                <div className="product-detail-skeleton-text"></div>
            </div>
        </div>
    </div>       
    )
}