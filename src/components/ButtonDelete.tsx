import React from "react";



interface Props {
  onclick: () => void;
}

function ButtonDelate({ onclick }: Props) {
  return (
    <button className="btn btn-outline-danger btn-sm" onClick={onclick}>
      Delete
    </button>
  );
}

export default ButtonDelate;
