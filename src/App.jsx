import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    deleteDoc,
    getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const firebaseApp = initializeApp({
    apiKey: "AIzaSyAQcgbDjCjA6UsPu3Lsu-3wcsajrf4O-zQ",
    authDomain: "start-app-cafc9.firebaseapp.com",
    projectId: "start-app-cafc9",
});

export const App = () => {
    const [nome, setNome] = useState("");
    const [time1, setTime1] = useState("");
    const [time2, setTime2] = useState("");
    const [placares, setPlacares] = useState([]);

    const db = getFirestore(firebaseApp);
    const placaresCollectionRef = collection(db, "placares");

    async function criarDado() {
        try {
            const placar = await addDoc(collection(db, "placares"), {
                nome,
                time1,
                time2,
            });

            console.log("dados salvos com sucessos", placar);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        const getPlacares = async () => {
            const data = await getDocs(placaresCollectionRef);
            setPlacares(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPlacares();
    }, []);

    async function deletePlacar(id) {
        const placarDoc = doc(db, "placares", id);
        await deleteDoc(placarDoc);
    }

    return (

        <div className="container form-group">


            <h1>Palpites</h1>

            <input
                type="text"
                placeholder="Digite seu nome"
                className="form-control p-1 m-3"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="number"
                placeholder="Time1"
                className="form-control p-1 m-3"
                value={time1}
                onChange={(e) => setTime1(e.target.value)}
            />
            <input
                type="number"
                placeholder="Time2"
                className="form-control p-1 m-3"
                value={time1}
                onChange={(e) => setTime2(e.target.value)}
            />
            <button className="btn-primary" onClick={criarDado}>Criar dado</button>

            <ul>
                {placares.map((placar) => {
                    return (
                        <>
                            <div className="d-flex flex-row">
                                <h4 className="p-3">{placar.nome}</h4>
                                <label>São Paulo</label>
                                <input className="form-control" value={placar.time1} type="number" />
                                <label>Flamengo</label>
                                <input className="form-control" value={placar.time2} type="number" />
                                <button className="btn-danger" onClick={() => deletePlacar(placar.id)}>Deletar</button>
                            </div>
                        </>
                    );
                })}
            </ul>
        </div>
    );
};

export default App;