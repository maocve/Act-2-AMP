import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Landing from "./views/landing.jsx";
import Libros from "./views/libros.jsx";
import Libro from "./views/libro.jsx";
import Papeleria from "./views/papeleria.jsx";
import Perfil from "./views/perfil.jsx";
import Login from "./views/login.jsx";
import RutaProtegida from "./components/rutaProtegida.jsx";
import Carrito from "./views/carrito.jsx";

export default function App() {
    return (
        <>
            <Navbar />
            <main className="page">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/libros" element={<Libros />} />
                        <Route path="/libros/:id" element={<Libro />} />
                        <Route path="/papeleria" element={<Papeleria />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/perfil"
                            element={
                                <RutaProtegida>
                                    <Perfil />
                                </RutaProtegida>
                            }
                        />
                        <Route path="/carrito" element={<Carrito />} />
                    </Routes>
                </div>
            </main>
        </>
    );
}
