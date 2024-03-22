import { useState } from "react";

function AddTodo({ postData }) {
  const [todo, setTodo] = useState({
    title: "",
    status: false,
    assignee: "",
    conclude: "",
  });
  const { title, status, assignee, conclude } = todo;

  // --------------------------------Display default Date-----------------------------
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  //  --------------------------------------------Handle change-----------------------------
  function handleChange(e) {
    const { value, type, name, checked } = e.target;
    const newValue =
      type === "checkbox" ? checked : name === "conclude" ? value : value;

    setTodo({ ...todo, [name]: newValue });
  }
  // ---------------------------------------Handle submit-------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = { ...todo };
    postData(newTodo);
    setTodo({
      title: "",
      status: false,
      assignee: "",
      conclude: "",
    });
  }

  return (
    <div className="addTodo">
      <form action="#" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Title :
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Assignee">
            Assignee :
            <select
              name="assignee"
              id="assignee"
              value={assignee}
              onChange={handleChange}
            >
              <option value="">--- Select ---</option>
              <option value="john">JOHN</option>
              <option value="david">DAVID</option>
              <option value="nayak">NAYAK</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="Status">
            Status :
            <input
              type="checkbox"
              name="status"
              id="Status"
              checked={status}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Completion_Date">
            Completion Date :
            <input
              type="date"
              name="conclude"
              id="#"
              value={conclude === "" ? selectedDate : conclude}
              onChange={handleChange}
            />
          </label>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
export default AddTodo;
