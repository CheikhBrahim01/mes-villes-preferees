import React from "react";

interface Props {
  rating: number;
  onChange: (newIndex: number) => void;
}

function Reating({ rating, onChange }: Props) {
  const IMG: string = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/15541908/yellow-amber-four-pointed-star-fractions-1-1-clipart-md.png";
  const IMG2: string = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/15541817/four-pointed-star-fractions-0-1-clipart-md.png";

  return (
    <div className="d-flex align-items-center">
      {[0, 1, 2, 3, 4].map(index => (
        <img
          key={index}
          width={25}
          className="me-1"
          style={{ cursor: 'pointer' }}
          src={index < rating ? IMG : IMG2}
          onClick={() => onChange(index + 1)}
          
        />
      ))}
    </div>
  );
}
export default Reating;