
import { async } from '@firebase/util';
import {getFirestore, getDocs, collection, addDoc} from 'firebase/firestore';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { useEffect, useState } from 'react';
import { db, storage } from './firebase';






function App() {

    const [imgURL, setImgUrl] = useState("");
    const [progress, setprogress] = useState(0);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [camisas, setCamisas] = useState([]);

    const userCollectionRef = collection(db, "camisas");

    useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        setCamisas(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
      getUsers();
    })



  const handleUpload = (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0]
    if(!file) return;

    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)


    uploadTask.on(
      "state_changed",
      snapshot => {
        const progres = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progres);
      },
      error => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setImgUrl(url)
          console.log(url)
          criarUser(url);
        })
      }
    )

    async function criarUser(url) {
      console.log(url);
      const user = await addDoc(userCollectionRef, {
        name: name,
        preco: price,
        url: url
      })

    }
   
  }

  return (
  <div>

    <input 
      type="text"
      placeholder="Nome..."
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

<input 
      type="text"
      placeholder="Preco..."
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />


      <form action="" onSubmit={handleUpload}>
        <input type="file"/>
        <button>Enviar</button>
      </form>
    <br/>
    {!imgURL && <progress value={progress} max="100"/>}
    {imgURL && <img src={imgURL} alt="Imagem" width="50"/>}

    <ul>
      {camisas.map((user) => {
        return (
          <div key = {user.id}>
              <img src={user.url} alt="Imagem" width="50"/>
              <li>{user.name}</li>
              <li>{user.preco}</li>
          </div>
        )
      })}
    </ul>
  </div>
  );
}

export default App;
