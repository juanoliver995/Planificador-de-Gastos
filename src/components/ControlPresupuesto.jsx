import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const presupuestoDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = (((presupuesto - presupuestoDisponible) / presupuesto) * 100).toFixed(2)

        setDisponible(presupuestoDisponible)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500)
    }, [gastos])

    const formatPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('de-DE', {
            style: "currency",
            currency: "EUR"
        })

    }

    const handleResetApp = () => {
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
                        trailColor: "#f5f5f5",
                        textColor: "#3b82f6"

                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button className="reset-app" type="button" onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatPresupuesto(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span>{formatPresupuesto(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{formatPresupuesto(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto