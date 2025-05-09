import React, { useState } from "react";
import CityCard from "./CityCard";
import Reating from "./Reating";
import "bootstrap/dist/css/bootstrap.min.css";

function List() {
  let images: string[] = [
    "https://th.bing.com/th/id/R.7d7e28556240e8a4c856aaa7b1f81761?rik=pMBC9dKfYd9Vxw&riu=http%3a%2f%2fgetinfolist.com%2fwp-content%2fuploads%2f2014%2f11%2f190910120101-04-shopping-cities-photos.jpg&ehk=foYEqugCo91QO6LnAoVYlZcLGbZw%2fVd3llH%2fFfGp0LE%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.xt_Mw4EZIJLkt4tza9U3EgHaEK?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.2f1a5da83a18de3f6684e9e962c4e024?rik=40366%2bnN%2bAkasw&riu=http%3a%2f%2fmedia.architecturaldigest.com%2fphotos%2f58f918044f42bd463db36a3f%2fmaster%2fpass%2f1+-+10+Greenest+Cities+in+America+in+2017.jpg&ehk=42TlD%2bEjhfNjyDiJena8L0tN%2fwykeEQuiNYB6WbAc9g%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.eD8lTB-cwXfnkNvhKSUNFgAAAA?rs=1&pid=ImgDetMain",
  ];

  const [title, setTitle] = useState("");
  const [description, setDescriptio] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [indeximage, setIndexImage] = useState(-1);
  const [reating, setReating] = useState<number>(0);
  const [cities, setCities] = useState<
    { title: string; description: string; image: string; reating: number }[]
  >([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [click,setClick] = useState(true)

  const handleDeleteCity = (v: number) => {
    setCities(cities.filter((city, index) => v !== index));
  };

  const handlEditCity = (index: number) => {
    const cityToEdit = cities[index];
    setEditingIndex(index);
    setTitle(cityToEdit.title);
    setDescriptio(cityToEdit.description);
    setImage(cityToEdit.image);
    setReating(cityToEdit.reating);
    setIndexImage(index)
  };

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();

    const newCity = {
      title,
      description,
      image,
      reating,
    };

    if (editingIndex !== null) {
      const updatedCities = [...cities];
      updatedCities[editingIndex] = newCity;
      setCities(updatedCities);
      setEditingIndex(null);
    } else {
      setCities([...cities, newCity]);
    }

    setTitle("");
    setDescriptio("");
    setImage("");
    setReating(0);
    setIndexImage(-1);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="position-sticky" style={{ top: "20px" }}>
            <div className="card shadow-sm">
              
              <div onClick={()=>setClick(!click)} className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  {editingIndex !== null
                    ? "Modifier une ville"
                    : "Ajouter une ville"}
                </h5>
              </div>{click && <div className="card-body">
                <form onSubmit={handleAddCity}>
                  <div className="mb-3">
                    <label htmlFor="cityTitle" className="form-label">
                      Nom de la ville
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cityTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Entrer le nom de la ville"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cityDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="cityDescription"
                      value={description}
                      onChange={(e) => setDescriptio(e.target.value)}
                      placeholder="Entrer une description"
                      rows={4}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <div className="d-flex flex-wrap gap-2">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className={`border p-1 ${
                            indeximage === index
                              ? "border-primary border-3"
                              : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            onClick={() => {
                              setIndexImage(index);
                              setImage(img);
                            }}
                            src={img}
                            style={{
                              width: "100px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                            alt={`City ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Note</label>
                    <Reating rating={reating} Onchange={setReating} />
                  </div>

                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        title === "" ||
                        description === "" ||
                        image === "" ||
                        reating === 0
                      }
                    >
                      {editingIndex !== null ? "Modifier" : "Ajouter"}
                    </button>
                  </div>
                </form>
              </div>}
              
              
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="row">
            {cities.length === 0 ? (
              <div className="col-12 text-center py-4">
                <p className="text-muted">Liste vide</p>
              </div>
            ) : (
              cities.map((city, index) => (
                <div className="col-12 col-md-6 col-lg-6 mb-4" key={index}>
                  <CityCard
                    title={city.title}
                    description={city.description}
                    image={city.image}
                    rating={city.reating}
                    onChangeRating={() => {}}
                    onDelate={() => handleDeleteCity(index)}
                    OnEdit={() => handlEditCity(index)}
                    isEditing={editingIndex === index}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
