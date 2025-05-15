import React, { useEffect, useState } from "react";

function Crud() {
  type Users = {
    id: string;
    name: string;
  };

  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [nameInput, setNameInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const hasCounted = React.useRef(false);

  

  useEffect(() => {
    if (hasCounted.current) return; 
    hasCounted.current = true;
    const storedCount = localStorage.getItem("Counteffect");
    const count = storedCount ? parseInt(storedCount) : 0;
    const newCount = count + 1;
    localStorage.setItem("Counteffect", newCount.toString());
    setCount(newCount);
  }, []);


  console.log(count);

  const API_KEY = 'https://6823664265ba058033969ae7.mockapi.io/test/'

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          API_KEY
        );
        const data: Users[] = await response.json();
        setUsers(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    await fetch(`${API_KEY}${id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      const res = await fetch(
        `${API_KEY}${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: nameInput }),
        }
      );
      const updatedUser = await res.json();
      setUsers(users.map((user) => (user.id === editId ? updatedUser : user)));
      setEditId(null);
    } else {
      const res = await fetch(
        `${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: nameInput }),
        }
      );
      const newUser = await res.json();
      setUsers([...users, newUser]);
    }

    setNameInput("");
  };

  const startEdit = (user: Users) => {
    setNameInput(user.name);
    setEditId(user.id);
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur</div>;

  // localStorage.setItem('count', count.toString());

  return (
    <>
      <h1>{count}</h1>
      {/* <button onClick={()=>setCount(count+1)}>addcount</button> */}
      <h2>{editId ? "Modifier un utilisateur" : "Ajouter un utilisateur"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
      </form>

      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => deleteUser(user.id)}>Delete</button>{" "}
            <button onClick={() => startEdit(user)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Crud;
