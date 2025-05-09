import React from "react";

interface Props {
  Onclick: () => void;
}

function ButtonEdit({ Onclick }: Props) {
  return (
    <button className="btn btn-outline-primary btn-sm me-2" onClick={Onclick}>
      Edit
    </button>
  );
}

export default ButtonEdit;
