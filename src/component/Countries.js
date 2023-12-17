import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
const Countries = () => {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Flag",
      selector: (row) => (
        <img width={40} height={40} src={row.flag} alt={row.name} />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-primary"
            onClick={() => alert(row.name)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            style={{ marginLeft: "5px" }}
            onClick={() => alert(`Are you sure you want to delete ${row.name}`)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <DataTable
      title="Country List"
      columns={columns}
      data={countries}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="550px"
      highlightOnHover
    />
  );
};

export default Countries;
