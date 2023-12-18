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
            window.location.reload();

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
        window.location.reload();
    }

    return (

        <div className="container form-group col-md-12 text-light">


            <h1 className="bg-light text-primary p-1 mt-3 rounded w-50 text-center">Rei dos Palpites</h1>

            <div className="d-flex">
                <label className="p-2">Nome</label>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    className="form-control p-1 m-3 col-md-2 w-50"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div className="d-flex">
                <label id="time1" className="p-2 ">Fluminense</label>
                <input
                    type="number"
                    placeholder="Placar Time1"
                    className="form-control p-1 m-3 w-50"
                    value={time1}
                    onChange={(e) => setTime1(e.target.value)}
                />
            </div>
            <div className="d-flex">
                <label id="time2" className="p-2">Al Ahly</label>
                <input
                    type="number"
                    placeholder="Placar Time2"
                    className="form-control p-1 m-3 w-50"
                    value={time2}
                    onChange={(e) => setTime2(e.target.value)}
                />
            </div>
            <button className="btn-primary rounded" onClick={criarDado} >Enviar</button>

            <ul className="container pt-4">
                {placares.map((placar) => (
                    <li key={placar.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="m-0">{placar.nome}</h3>
                            <p className="mb-0">
                                {placar.time1} X {placar.time2}
                            </p>
                        </div>
                        <div>
                            <span className="badge bg-primary me-2">Fluminense</span>
                            <span className="badge bg-danger">Al Ahly</span>
                        </div>
                        <button className="btn btn-danger" onClick={() => deletePlacar(placar.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;