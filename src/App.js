import { useContext, useState } from 'react';
import './App.css';
import { NotesContext, Notas, Comments } from './Componentes/Nota';

const dUsers = [
  {
      id: 0,
      name: "Admin",
      role: "admin"
  },
  {
      id: 1,
      name: "Pepe",
      role: "client"
  }
]
const dProductos = [
  {
      id: 0,
      name: "Lapiz",
      cantidad: 5,
  },{
      id: 1,
      name: "Cuaderno",
      cantidad: 1,
  },{
      id: 2,
      name: "Goma",
      cantidad: 2,
  }
]
const dComments = {
  isShown: false,
  comments: [
  {
    id : 0,
      idUser: 0,
      idProduct: 0,
      text: "comment"
  },{
    id : 1,
    idUser: 0,
    idProduct: 0,
    text: "comment 2"
  },{
    id : 2,
    idUser: 0,
    idProduct: 1,
    text: "comment sda"
  }
]}

function App() {
const [users, setUsers] = useState( dUsers[1] );
const [products, setProducts] = useState( dProductos );
const [commentsData, setComments] = useState( dComments )

  return (
    <div className="App">
      <NotesContext.Provider value={{users, setUsers, products, setProducts, commentsData, setComments}} >
      <header>
        Role: {users.role} <button onClick={changeUser}>Change user</button>
      </header>
      <main>
          <Notas/>
          <Comments />
      </main>
      </NotesContext.Provider>
    </div>
  );

  
  function changeUser() {
      if(users.role == "client") setUsers(dUsers[0])
      else setUsers(dUsers[1])
  }
}

export default App;
