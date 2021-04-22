import React from "react";
import Loader from "react-loader-spinner";

const css = {
  backdrop: {
    backgroundColor: "#1a1a1bc9",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: "40",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const Spinner = () => (
  <>
    <div style={css.backdrop}>
      <Loader
        type="Puff"
        color="#76c2af"
        height={100}
        width={100}
        timeout={3000}
        style={css.content}
      />
    </div>
  </>
);

export default Spinner;
