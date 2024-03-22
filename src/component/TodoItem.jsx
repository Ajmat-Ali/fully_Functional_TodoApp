/* eslint-disable react/no-unknown-property */
import { useState } from "react";

function TodoItem({
  item: { id, title, assignee, status, conclude },
  updateData,
  updateStatus,
  deleteTodo,
}) {
  //------------------------- Maintaining State --------------------

  const [isEdition, setIsEdition] = useState(false);

  const [updateTodo, setUpdateTodo] = useState({
    title: title,
    assignee: assignee,
    status: status,
    conclude: conclude,
  });

  //  --------------------------Handle Edit Function ----------------------------
  const handleEdit = () => {
    if (isEdition) {
      updateData(id, updateTodo);
    }
    setIsEdition(!isEdition);
  };

  //  --------------------------Handle Change Function ----------------------------
  const handleChange = (e) => {
    const { type, value, checked, name } = e.target;
    const newValue =
      type === "checkbox" ? checked : name === "date" ? value : value;

    setUpdateTodo({ ...updateTodo, [name]: newValue });
  };
  //  --------------------------Handle Update-Status Function ----------------------------
  const handleUpdateStatus = () => {
    updateStatus(id, status);
  };
  //  --------------------------Handle Delete Function ----------------------------
  const handleDelete = () => {
    deleteTodo(id);
  };
  // ---------------------------------------Returning Data--------------------------
  return (
    <div className="todoItem" style={{ textAlign: "center" }}>
      <h1>{id}</h1>
      <h2>
        {isEdition ? (
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            id="title"
            value={updateTodo.title}
            onChange={handleChange}
          />
        ) : (
          title
        )}
      </h2>
      <h3>
        {" "}
        {isEdition ? (
          <select
            name="assignee"
            id="assignee"
            value={updateTodo.assignee}
            onChange={handleChange}
          >
            <option value="---select---">--select--</option>
            <option value="john">JOHN</option>
            <option value="david">DAVID</option>
            <option value="nayak">NAYAK</option>
          </select>
        ) : (
          assignee
        )}
      </h3>
      <h3>
        {" "}
        {isEdition ? (
          <input
            type="date"
            name="conclude"
            id="date"
            value={updateTodo.conclude}
            onChange={handleChange}
          />
        ) : (
          conclude
        )}
      </h3>
      <button onClick={handleUpdateStatus}>
        {status ? "Completed" : "Pending"}
      </button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>{isEdition ? "Save" : "Edit"}</button>
    </div>
  );
}
export default TodoItem;
