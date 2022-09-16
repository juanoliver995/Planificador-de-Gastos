import { useState, useEffect } from "react"
import Header from "./components/Header"
import Modal from "./components/Modal"
import Filtros from "./components/Filtros"
import ListadoGastos from "./components/ListadoGastos"
import { generateId } from "./helpers"
import iconAñadirGasto from "./img/nuevo-gasto.svg"

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem("presupuesto")) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : [])
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gastoFiltrado => gastoFiltrado.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])


  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  }, [presupuesto])


  useEffect(() => {
    const presupuestols = Number(localStorage.getItem("presupuesto")) ?? 0
    if (presupuestols > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])

  }, [gastos])


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)

  }


  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }


  const guardarGastos = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else {
      gasto.id = generateId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
      setGastoEditar({})
    }
    setTimeout(() => {
      setModal(false)
    }, 500)
    setAnimarModal(false)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {
        isValidPresupuesto && (
          <>
            <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={iconAñadirGasto}
                alt="icono añadir gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )
      }
      {
        modal && <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGastos={guardarGastos}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }

    </div>
  )
}

export default App
