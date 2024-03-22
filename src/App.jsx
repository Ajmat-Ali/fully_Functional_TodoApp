import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// local Import
import Todo from "./component/Todo";
import AddTodo from "./component/AddTodo";

function App() {
  const [userData, setUserData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [status, setStatus] = useState("all");
  const [person, setPerson] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  //-------------------------- Retrieve User Todo Data----------------------
  async function getTodo() {
    try {
      await axios({
        method: "get",
        baseURL: `http://localhost:8080`,
        url: `/Todo?_page=${page}&_limit=3`,
      })
        .then((res) => {
          // console.log(res);
          // setTotalPage(userData.length / page);
          setUserData(res.data);
          setOriginalData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------------------- Post User Todo Data-------------------------
  const postData = (newTodo) => {
    try {
      axios({
        method: "post",
        baseURL: "http://localhost:8080",
        url: "/Todo",
        headers: { "content-Type": "application/json" },
        data: JSON.stringify(newTodo),
      })
        .then(() => getTodo())
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------- Update Data PATCH Request--------------------------
  const updateData = (id, updateTodo) => {
    axios({
      method: "patch",
      baseURL: "http://localhost:8080",
      url: `/Todo/${id}`,
      headers: { "content-Type": "application/json" },
      data: JSON.stringify(updateTodo),
    })
      .then(() => getTodo())
      .catch((err) => console.log(err));
  };

  // ------------------------------ Update Only Status---------------------------------
  const updateStatus = (id, status) => {
    axios({
      method: "patch",
      baseURL: "http://localhost:8080",
      url: `/Todo/${id}`,
      headers: { "content-Type": "application/json" },
      data: JSON.stringify({ status: !status }),
    })
      .then(() => getTodo())
      .catch((err) => console.log(err));
  };

  // --------------------------------Delete Todo Data ------------------------------

  const deleteTodo = (id) => {
    axios({
      method: "delete",
      baseURL: "http://localhost:8080",
      url: `/Todo/${id}`,
    })
      .then(() => getTodo())
      .catch((err) => console.log(err));
  };

  //------------------------------ Mount Phase------------------------------
  useEffect(() => {
    getTodo();
  }, [page]);

  //------------------------------------Filter Data based on Status ----------------
  const applyFilterData = (data) => {
    let filterData = [...data];

    if (status !== "all") {
      filterData = filterData.filter((item) => {
        if (status === "completed") {
          return item.status;
        } else if (status === "pending") {
          return !item.status;
        }
        return true;
      });
    }
    if (person) {
      filterData = filterData.filter((item) => item.assignee === person);
    }
    return filterData;
  };

  // --------------------------------------------------Returning Component-------------------------
  return (
    <>
      <AddTodo postData={postData} />
      <div style={{ textAlign: "center", margin: "20px" }}>
        <select name="filter" id="" onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <br /> <br />
        <select name="filter" id="" onChange={(e) => setPerson(e.target.value)}>
          <option value="">All Person</option>
          <option value="john">John</option>
          <option value="david">David</option>
          <option value="nayak">NAYAK</option>
        </select>
      </div>
      <Todo
        userData={applyFilterData(userData)}
        updateData={updateData}
        updateStatus={updateStatus}
        deleteTodo={deleteTodo}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button disabled={page <= 1} onClick={() => setPage((pre) => pre - 1)}>
          Previous
        </button>
        <button>{page}</button>
        <button
          disabled={page > userData.length}
          onClick={() => setPage((pre) => pre + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
