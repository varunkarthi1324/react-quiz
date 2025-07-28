import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import StartScreen from "./startScreen";

const initialState = { question: [], status: "loading" };

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        question: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [{ question, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = question.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
}
