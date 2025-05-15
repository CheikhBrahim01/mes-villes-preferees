import React from "react";

interface Props {
  onclick: () => void;
}

function ButtonEdit({ onclick }: Props) {
  return (
    <button className="btn btn-outline-primary btn-sm me-2" onClick={onclick}>
      Edit
    </button>
  );
}

export default ButtonEdit;
