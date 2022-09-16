import iconCerrar from "../img/cerrar.svg"
import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
const Modal = ({ setModal, animarModal, setAnimarModal, guardarGastos, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState("")
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")
    const [fecha, setFecha] = useState("")
    const [id, setId] = useState("")


    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])


    const ocultarModal = () => {
        setTimeout(() => {
            setModal(false)

        }, 500)
        setGastoEditar({})
        setAnimarModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {

            setMensaje("Todos los campos son Obligatorios")
            setTimeout(() => {
                setMensaje("")
            }, 3000)
            return
        }

        guardarGastos({ nombre, cantidad, categoria, id, fecha })

    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={iconCerrar}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : ''}`}>
                <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        id="nombre"
                        value={nombre}
                        onChange={({ target }) => setNombre(target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        placeholder="Añade el valor del gasto"
                        id="cantidad"
                        value={cantidad}
                        onChange={({ target }) => setCantidad(Number(target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categorias">Categorias</label>
                    <select
                        id="categorias"
                        value={categoria}
                        onChange={({ target }) => setCategoria(target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="varios">Gastos Varios</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
                />
                {
                    mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>
                }
            </form>
        </div>
    )
}

export default Modal