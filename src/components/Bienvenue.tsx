import React from "react";
interface Props {
  name: string;
}
function Bienvenue({ name }: Props) {
  return (
    <>
      <h1>Bienvenue {name} !</h1>
    </>
  );
}

export default Bienvenue;
