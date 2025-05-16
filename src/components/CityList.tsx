import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./CityForm";
import CityFilter from "./CityFilter";

function CityList() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [typeVille, setTypeVille] = useState("");
  const [rating, setRating] = useState(0);
  const [indexImage, setIndexImage] = useState(-1);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isOpened, setIsOpened] = useState(true);
  const [cities, setCities] = useState<
    {
      title: string;
      description: string;
      image: string;
      typeVille: string;
      rating: number;
    }[]
  >([]);

  const handleDeleteCity = (index: number) => {
    setCities(cities.filter((_, i) => i !== index));
  };

  const handleEditCity = (index: number) => {
    const city = cities[index];
    setEditingIndex(index);
    setTitle(city.title);
    setDescription(city.description);
    setImage(city.image);
    setTypeVille(city.typeVille);
    setRating(city.rating);
    setIndexImage(index);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="position-sticky" style={{ top: "20px" }}>
            <div className="card shadow-sm">
              <div
                className="card-header bg-primary text-white"
                onClick={() => setIsOpened(!isOpened)}
              >
                <h5 className="mb-0">
                  {editingIndex !== null
                    ? "Modifier une ville"
                    : "Ajouter une ville"}
                </h5>
              </div>
              <div className="card-body">
                {isOpened && (
                  <CityForm
                    cities={cities}
                    setCities={setCities}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <CityFilter
          cities={cities}
          query={query}
          setQuery={setQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          handleDeleteCity={handleDeleteCity}
          handleEditCity={handleEditCity}
          editingIndex={editingIndex}
        />
      </div>
    </div>
  );
}

export default CityList;
