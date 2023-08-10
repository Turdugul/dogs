import React, { useReducer, useEffect } from "react";
import { styled } from "styled-components";

const initialState = {
  dogs: [],
};

export const reducerFn = (state, action) => {
  switch (action.type) {
    case "GET_DOGS_TYPE":
      console.log(action, "1");
      return {
        dogs: action.payload,
      };

    default:
      return state;
    // throw new Error("Error in the change of state");
  }
};
const DogList = () => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const getUsersData = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const result = await response.json();

      const data = Object.entries(result.message).map(([title, value]) => {
        return {
          title: title,
          value,
        };
      });
      console.log(data, "data");

      dispatch({ type: "GET_DOGS_TYPE", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div>
      <Title>Dog breeds</Title>
      {state.dogs.map((item) => {
        console.log(item, "item");
        return (
          <List>
            <li>
              <h1>{item.title} </h1>
              <ListValue>
                {item.value.length > 0 ? (
                  <InnerLi>
                    <p>{item.value}</p>
                  </InnerLi>
                ) : (
                  <h5>no item</h5>
                )}
              </ListValue>
            </li>
          </List>
        );
      })}
    </div>
  );
};
const Title = styled.h1`
  text-transform: capitalize;
  transform: translate(200px, 20px);
`
const List = styled.ul`
  list-style: none;
  transform: translate(200px, 20px);
  height: 220px;
  width: 300px;
  background-color: #e3e5ee;
  color: black;
  display: flex;
  flex-direction: column;
`;
const ListValue = styled.ul`
  list-style: none;
  position: relative;
  height: 150px;
  width: 180px;
  height: 100px;
  background-color: #446883;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;
const InnerLi = styled.li`
  padding-left: 10px;
  &.p {
    padding-left: 10px;
  }
  &.h5 {
    padding-left: 20px;
  }
`;
export default DogList;
