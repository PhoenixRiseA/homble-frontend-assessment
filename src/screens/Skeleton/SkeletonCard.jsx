import { Spinner } from "../Spinner/Spinner";
import "./SkeletonCard.css";
const SkeletonCard = () => {
  return (
    <div className="col">
      <div className="card">
        <div className="skeleton skeleton-img"></div>
        <div className="card-body">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    </div>
  );
};
export const Skeleton = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center py-2">
        <button type="button" className="btn btn-dark">
          <Spinner/>
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-2">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};
