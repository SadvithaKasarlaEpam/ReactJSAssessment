import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";

export type PriorityType = "Low" | "Medium" | "High";

export interface List {
  id: number;
  name: string;
  completed: boolean;
  priority: PriorityType;
}

type Actiontype =
  | { type: "Add"; payload: List } // payload REQUIRED, must be List
  | { type: "Remove"; payload: number } // payload REQUIRED, must be number
  | { type: "EditName"; payload: number } // payload REQUIRED, must be number
  | { type: "checkbox"; payload: number };

const TodoComponent = () => {
  const refadd = useRef<HTMLInputElement>(null);
  const refedit = useRef<HTMLInputElement>(null);

  const [n, setn] = useState<number>(1);

  //-------------------------------------
  const reducernewName = (
    state: string,
    action: { type: string; payload: string },
  ): string => {
    switch (action.type) {
      case "update":
        return action.payload;
      default:
        return state;
    }
  };

  const [newNamereducer, dispatchnewName] = useReducer(reducernewName, " ");

  //------------------------------
  const [editNameDic, SeteditNameDic] = useState<{ [key: number]: string }>({});

  //------------------------------------------
  const reducernewpriority = (
    state: PriorityType,
    action: { type: string; payload: PriorityType },
  ): PriorityType => {
    switch (action.type) {
      case "updatePriority":
        return action.payload;
      default:
        return state;
    }
  };

  const [newpriorityreducer, dispatchnnewpriority] = useReducer(
    reducernewpriority,
    "Low" as PriorityType,
  );

  //-----------------------------------
  const reducer = (state: List[], action: Actiontype): List[] => {
    switch (action.type) {
      case "Add": {
        return [...state, action.payload];
      }
      case "Remove": {
        return state.filter((item) => item.id !== action.payload);
      }
      case "EditName": {
        return state.map((item) =>
          item.id === action.payload
            ? { ...item, name: editNameDic[item.id] ?? item.name }
            : item,
        );
      }
      case "checkbox": {
        return state.map((item) =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item,
        );
      }
      default:
        return state;
    }
  };
  const [listOfTodosreducer, dispatchtodos] = useReducer(reducer, [
    {
      id: 0,
      name: "Aaa",
      completed: false,
      priority: "Low" as PriorityType,
    },
  ]);

  //------------------------------
  useEffect(() => {
    console.log("To do List is Updated:", listOfTodosreducer);
    localStorage.setItem(
      "Updated todo list",
      JSON.stringify(listOfTodosreducer),
    );
  }, [listOfTodosreducer]);

  useEffect(() => {
    refadd.current?.focus();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "left" }}>Todo List</h2>
      {/* Add todo :  */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchtodos({
            type: "Add",
            payload: {
              id: n,
              name: newNamereducer,
              completed: false,
              priority: newpriorityreducer,
            },
          });
          dispatchnewName({ type: "update", payload: "" });
          dispatchnnewpriority({ type: "updatePriority", payload: "Low" });
          setn(n + 1);
          refadd.current?.focus();
        }}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          value={newNamereducer}
          onChange={(e) =>
            dispatchnewName({ type: "update", payload: e.target.value })
          }
          ref={refadd}
        />
        <select
          value={newpriorityreducer}
          onChange={(e) =>
            dispatchnnewpriority({
              type: "updatePriority",
              payload: e.target.value as PriorityType,
            })
          }
          // Setnewpriority(e.target.value as PriorityType]]]]
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* todo count details : */}

      <div style={{ textAlign: "left" }}>
        <h3>Total no of todos :{listOfTodosreducer.length}</h3>
        <h3>
          Completed todos :{" "}
          {listOfTodosreducer.filter((x) => x.completed).length}
        </h3>
        <h3>
          Pending todos :{" "}
          {listOfTodosreducer.filter((x) => !x.completed).length}
        </h3>
      </div>

      {/* Displaying todo list : */}
      {listOfTodosreducer.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center", // vertically center everything
            gap: "2px", // space between items
            padding: "2px",
            marginBottom: "2px",
            border: "0.05px solid #ccc",
            borderRadius: "0.5px",
          }}
        >
          {/* checkbox: */}
          <h1>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() =>
                dispatchtodos({ type: "checkbox", payload: item.id })
              }
              style={{ width: "40px", height: "40px" }}
            />
          </h1>
          <h2>{item.name}</h2>
          &nbsp; &nbsp; &nbsp;
          <h3>Priority:{item.priority}</h3>
          <br />
          &nbsp;&nbsp;
          <h3>
            {item.completed ? "  Status :Completed" : "  Status : Pending"}
          </h3>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            onClick={() => dispatchtodos({ type: "Remove", payload: item.id })}
          >
            Remove
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            ref={refedit}
            placeholder={item.name}
            value={editNameDic[item.id] ?? item.name}
            onChange={(e) =>
              SeteditNameDic((pre) => ({ ...pre, [item.id]: e.target.value }))
            }
          />
          <button
            onClick={() => {
              dispatchtodos({ type: "EditName", payload: item.id });
              refedit.current?.focus();
            }}
          >
            EditName
          </button>
        </div>
      ))}
    </>
  );
};

export default TodoComponent;
