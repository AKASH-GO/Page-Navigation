import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(response.data);
    } catch (error) {
      alert("failed to fetch data");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="tableContainer">
      <h1 className="tableTitle">Employee Data Table</h1>
      <table className="dataTable">
        <thead>
          <tr className="tableHeader">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="tableRow">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginationContainer">
        <div className="paginationButtons">
          <button
            onClick={prevPage}
            className="paginationButton"
            style={{ opacity: currentPage > 1 ? 1 : 0.5 }}
          >
            Previous
          </button>
          <span className="paginationCurrent">{currentPage}</span>
          <button
            onClick={nextPage}
            className="paginationButton"
            style={{ opacity: currentPage < totalPages ? 1 : 0.5 }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
