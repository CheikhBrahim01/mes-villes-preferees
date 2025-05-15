import CityCard from "./CityCard";

type City = {
  title: string;
  description: string;
  image: string;
  typeVille: string;
  rating: number;
};

type Props = {
  cities: City[];
  query: string;
  setQuery: (value: string) => void;
  filterType: string;
  setFilterType: (value: string) => void;
  handleDeleteCity: (index: number) => void;
  handleEditCity: (index: number) => void;
  editingIndex: number | null;
};

function CityFilter({
  cities,
  query,
  setQuery,
  filterType,
  setFilterType,
  handleDeleteCity,
  handleEditCity,
  editingIndex,
}: Props) {
  const filteredCities = cities.filter(
    (city) =>
      city.title.toLowerCase().includes(query.toLowerCase()) &&
      (filterType === "" || city.typeVille === filterType)
  );

  return (
    <div className="col-md-7">
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par nom..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Tous les types</option>
            <option value="Eroupe">Eroupe</option>
            <option value="Afrique">Afrique</option>
            <option value="Estouralya">Estouralya</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredCities.map((city, index) => (
          <div className="col-12 col-md-6 mb-4" key={index}>
            <CityCard
              title={city.title}
              description={city.description}
              image={city.image}
              typeVille={city.typeVille}
              rating={city.rating}
              onDelate={() => handleDeleteCity(index)}
              onEdit={() => handleEditCity(index)}
              isEditing={editingIndex === index}
              onChangeRating={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityFilter;
