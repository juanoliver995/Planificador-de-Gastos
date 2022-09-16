import { useState, useEffect } from "react"

const Filtros = ({ filtro, setFiltro }) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label>Filtrar Gastos</label>
                    <select
                        value={filtro}
                        onChange={({ target }) => setFiltro(target.value)}
                    >
                        <option value="">-- Categorias --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="varios">Gastos Varios</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filtros