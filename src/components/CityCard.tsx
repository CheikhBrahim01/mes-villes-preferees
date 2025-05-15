import React, { useState } from "react";
import Reating from "./Rating";
import ButtonDelate from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";

interface Props {
  title: string;
  description: string;
  image: string;
  typeVille: string;
  rating: number;
  onChangeRating: (newRating: number) => void;
  onDelate: () => void;
  onEdit: () => void;
  isEditing: boolean;
}

function CityCard({
  title,
  description,
  typeVille,
  image,
  rating,
  onDelate,
  onEdit,
  onChangeRating,
  isEditing,
}: Props) {
  const [mouse, setMouse] = useState(false);
  return (
    <div
      className="card mb-4 shadow-sm"
      onMouseEnter={() => setMouse(true)}
      onMouseLeave={() => setMouse(false)}
    >
      {isEditing && (
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-warning">Editing</span>
        </div>
      )}
      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{typeVille}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Reating rating={rating} onChange={onChangeRating} />
          {mouse && (
            <div>
              {!isEditing && <ButtonDelate onclick={onDelate} />}
              <ButtonEdit onclick={onEdit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CityCard;
