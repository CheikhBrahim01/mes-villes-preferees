import React, { useEffect, useState } from "react";
import Rating from "./Rating";

type City = {
  title: string;
  description: string;
  image: string;
  typeVille: string;
  rating: number;
};

type Props = {
  cities: City[];
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
  editingIndex: number | null;
  setEditingIndex: (index: number | null) => void;
};

function CityForm({ cities, setCities, editingIndex, setEditingIndex }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [typeVille, setTypeVille] = useState("");
  const [rating, setRating] = useState(0);
  const [indexImage, setIndexImage] = useState(-1);

  const images: string[] = [
    "https://th.bing.com/th/id/R.7d7e28556240e8a4c856aaa7b1f81761?rik=pMBC9dKfYd9Vxw&riu=http%3a%2f%2fgetinfolist.com%2fwp-content%2fuploads%2f2014%2f11%2f190910120101-04-shopping-cities-photos.jpg&ehk=foYEqugCo91QO6LnAoVYlZcLGbZw%2fVd3llH%2fFfGp0LE%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.xt_Mw4EZIJLkt4tza9U3EgHaEK?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.2f1a5da83a18de3f6684e9e962c4e024?rik=40366%2bnN%2bAkasw&riu=http%3a%2f%2fmedia.architecturaldigest.com%2fphotos%2f58f918044f42bd463db36a3f%2fmaster%2fpass%2f1+-+10+Greenest+Cities+in+America+in+2017.jpg&ehk=42TlD%2bEjhfNjyDiJena8L0tN%2fwykeEQuiNYB6WbAc9g%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.eD8lTB-cwXfnkNvhKSUNFgAAAA?rs=1&pid=ImgDetMain",
  ];

  useEffect(() => {
    if (editingIndex !== null) {
      const city = cities[editingIndex];
      setTitle(city.title);
      setDescription(city.description);
      setImage(city.image);
      setTypeVille(city.typeVille);
      setRating(city.rating);
      setIndexImage(images.indexOf(city.image));
    }
  }, [editingIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCity: City = { title, description, image, typeVille, rating };

    if (editingIndex !== null) {
      const updated = [...cities];
      updated[editingIndex] = newCity;
      setCities(updated);
      setEditingIndex(null);
    } else {
      setCities([...cities, newCity]);
    }

    setTitle("");
    setDescription("");
    setImage("");
    setTypeVille("");
    setRating(0);
    setIndexImage(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nom de la ville</label>
        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <div className="d-flex flex-wrap gap-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`border p-1 ${index === indexImage ? "border-primary border-3" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setImage(img);
                setIndexImage(index);
              }}
            >
              <img src={img} style={{ width: "100px", height: "70px", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Type de ville</label>
        <select
          className="form-select"
          value={typeVille}
          onChange={(e) => setTypeVille(e.target.value)}
        >
          <option value="">Choisir un type</option>
          <option value="Eroupe">Eroupe</option>
          <option value="Afrique">Afrique</option>
          <option value="Estouralya">Estouralya</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Note</label>
        <Rating rating={rating} onChange={setRating} />
      </div>

      <button className="btn btn-primary w-100" type="submit" disabled={!title || !description || !image || !typeVille || rating === 0}>
        {editingIndex !== null ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}

export default CityForm;
