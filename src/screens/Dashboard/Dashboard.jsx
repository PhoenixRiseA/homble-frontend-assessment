import { useMemo, useState } from "react";
import { useRequest } from "../../hooks";

const Dashboard = () => {
  const { loading, data, error } = useRequest("dashboard");
  const [selected, setSelected] = useState([]);
  const rowsMemo = useMemo(
    () =>
      data?.map(
        (
          {
            name,
            id,
            description,
            allergen_info,
            cooking_instruction,
            cost_price,
            selling_price,
          },
          index
        ) => {
          return (
            <tr key={id}>
              <td>
                <input class="form-check-input" type="checkbox" onChange={(e)=>{
                    console.log(e.target.checked);
                    const checked = e.target.checked;

                    if(checked){
                        setSelected((state)=>[...state,id])
                    }else{
                        setSelected((state)=>[...state.filter((currId)=>currId === id)])
                    }
                    
                }} />{" "}
              </td>
              <th scope="row">{index}</th>

              <td>{name} </td>
              <td>{id}</td>
              <td>{description} </td>
              <td>{allergen_info} </td>
              <td>{cooking_instruction} </td>
              <td>{cost_price} </td>
              <td>{selling_price} </td>
            </tr>
          );
        }
      ),
    [data]
  );
  return (
    <div>
      <input className="form-control my-2 mx-4" placeholder="type to search" />
      <table className="table table-striped table-hover table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">Allergen Info</th>
            <th scope="col">Cooking Instruction</th>
            <th scope="col">Cost Price</th>
            <th scope="col">Selling Price</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{rowsMemo}</tbody>
      </table>
    </div>
  );
};
export default Dashboard;
