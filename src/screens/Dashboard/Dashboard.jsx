import { useEffect, useMemo, useState } from "react";
import { useRequest } from "../../hooks";
import { debounce } from "../../utils";
import sortIcon from '../../assets/sort.png';
import './Dashboard.css'
const Dashboard = () => {
  let { loading, data, error } = useRequest("dashboard");
  const [selected, setSelected] = useState([]);
  const [rowData, setRowData] = useState();
  const [isSorted, setIsSorted] = useState(false);
  const [isIdSorted, setIsIdSorted] = useState(false);
  const [isNameSorted, setIsNameSorted] = useState(false);
  const [isSpSorted, setIsSpSorted] = useState(false);

  const handleIdSort = () => {
    const tempData = rowData.sort((a,b)=>Number(b.id)-Number(a.id))
    if(!isIdSorted){
        setRowData([...tempData])
    }else{
        setRowData([...rowData.sort((a,b)=>Number(a.id)-Number(b.id))])
    }
    
    setIsIdSorted(!isIdSorted);
  };
  const handleNameSort = () => {
    const tempData = rowData.sort((a, b) => a.name.localeCompare(b.name));
    if(!isNameSorted){
        setRowData([...tempData])
    }else{
        setRowData([...rowData.sort((a, b) => b.name.localeCompare(a.name))])
    }
    setIsNameSorted(!isNameSorted);
  };
  const handleSpSort = () => {
    const tempData = rowData.sort((a,b)=>Number(a.selling_price)-Number(b.selling_price))
    if(!isSpSorted){
        setRowData([...tempData])
    }else{
        setRowData([...rowData.sort((a,b)=>Number(b.selling_price)-Number(a.selling_price))])
    }
    setIsSpSorted(!isSpSorted);
  };
  useEffect(() => {
    setRowData(data);
  }, [data]);

  const rowsMemo = useMemo(
    () =>
      rowData?.map(
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
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    const checked = e.target.checked;

                    if (checked) {
                      setSelected((state) => [...state, id]);
                    } else {
                      setSelected((state) => [
                        ...state.filter((currId) => currId === id),
                      ]);
                    }
                  }}
                />{" "}
              </td>
              <th scope="row">{index}</th>
              <td>{id}</td>
              <td>{name} </td>
              
              <td>{description} </td>
              <td>{allergen_info} </td>
              <td>{cooking_instruction} </td>
              <td>{cost_price} </td>
              <td>{selling_price} </td>
            </tr>
          );
        }
      ),
    [ rowData]
  );
  const deleteHandler = () => {
    let tempData = [];
    tempData = rowData?.filter(({ id }) => !selected.includes(id));
    setRowData([...tempData]);
  };

  if (error) {
    return <div>Something went wrong</div>;
  }
  return loading ? (
    "Loading..."
  ) : (
    <div>
      <input onChange={debounce((e)=>{
        const term = e.target.value;
        const tempData = data.filter((row) =>
            row.id.includes(term) || row.name.toLowerCase().includes(term.toLowerCase())
          );
        setRowData([...tempData])
      },500)} className="form-control my-2 " placeholder="type to search" />
      <table className="table table-striped table-hover table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">Select to delete</th>
            <th scope="col">#</th>
            
            <th scope="col" ><div className="d-flex"> <div>Id</div> <div onClick={handleIdSort} className={ `rounded mx-1 px-2 sortable ${isIdSorted ? 'sorted' : ''}`}> <img src={sortIcon} alt="sort" /> </div>  </div> </th>
            <th scope="col" ><div className="d-flex"> <div>Name</div> <div onClick={handleNameSort} className={ `rounded mx-1 px-2 sortable ${isNameSorted ? 'sorted' : ''}`}> <img src={sortIcon} alt="sort" /> </div>  </div></th>
            <th scope="col">Description</th>
            <th scope="col">Allergen Info</th>
            <th scope="col">Cooking Instruction</th>
            <th scope="col">Cost Price</th>
            <th scope="col" ><div className="d-flex"> <div>Selling Price</div> <div onClick={handleSpSort} className={ `rounded mx-1 px-2 sortable ${isSpSorted ? 'sorted' : ''}`}> <img src={sortIcon} alt="sort" /> </div>  </div></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{rowsMemo}</tbody>
      </table>
      {selected.length > 0 && (
        <button onClick={deleteHandler} type="button" className="btn btn-dark mx-4">
          Delete
        </button>
      )}
    </div>
  );
};
export default Dashboard;
