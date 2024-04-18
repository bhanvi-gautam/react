import React, { useEffect, useState } from "react";
import { useGetPostsMutation } from "../rtk/AddSlice";
import TodoItem from "./TodoItem";
import { notifySuccess } from "../toast";
import { ToastContainer } from "react-toastify";
import Card from "react-bootstrap/Card";

const Todos = () => {
  const [getData, { isLoading, isSuccess, isError, post }] =
    useGetPostsMutation();
  const [posts, setPosts] = useState(post);
  const userId = localStorage.getItem("userId");

  const getTodos = async (value) => {
    console.log("userId", userId);
    getData({ id: userId })
      .unwrap()
      .then((fetchTodos) => {
        console.log("fetchTodos", fetchTodos.data);
        setPosts(fetchTodos.data);
        if (value === 1000) {
          notifySuccess("Task Updated");
        }
        if (value === 2000) {
          notifySuccess("Task Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {isSuccess && (
        <>
          {posts?.map((data, index) => {
            console.log("data.id", data.id);

            return (
              <Card
                key={index}
                className="p-2 m-3"
                style={{ backgroundColor: "#eee3c1f0" }}
              >
                <Card.Body>
                  <TodoItem
                    text={data.todo_text}
                    todoId={data.id}
                    parentCall={getTodos}
                  />
                </Card.Body>
              </Card>
            );
          })}
        </>
      )}
      <ToastContainer containerId="A" />
      <ToastContainer containerId="B" />
    </div>
  );
};

export default Todos;
