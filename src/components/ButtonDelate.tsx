import React from "react";

interface Props {
  Onclick: () => void;
}

function ButtonDelate({ Onclick }: Props) {
  return (
    <button className="btn btn-outline-danger btn-sm" onClick={Onclick}>
      Delete
    </button>
  );
}

export default ButtonDelate;
