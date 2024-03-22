import TodoItem from "./TodoItem";

function Todo({ userData, updateData, updateStatus, deleteTodo }) {
  return (
    <div>
      {userData.map((ele) => {
        return (
          <TodoItem
            key={ele.id}
            item={ele}
            updateData={updateData}
            updateStatus={updateStatus}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
}
export default Todo;
