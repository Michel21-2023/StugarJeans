import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const RegistroInventario = () => {
  const [proveedor, setProveedor] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [dimensiones, setDimensiones] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [color, setColor] = useState('');
  const [fecha_alta, setFecha_Alta] = useState('');
  const [fecha_baja, setFecha_Baja] = useState('');
  const [entradas, setEntradas] = useState('');
  const [salidas, setSalidas] = useState('');
  const [talla, setTalla] = useState('');
  const [stok, setStok] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEdicion, setIndiceEdicion] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [inventario, setInventario] = useState([]);
  const [orden, setOrden] = useState('asc');

  useEffect(() => {
    const inventarioGuardado = localStorage.getItem('inventario');
    if (inventarioGuardado) {
      setInventario(JSON.parse(inventarioGuardado));
    }
  }, []);

  const mostrarMensaje = (msg) => {
    setMensaje(msg);
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const agregarInventario = (event) => {
    event.preventDefault();

    if (!proveedor ||!clave || !nombre || !tipo || !dimensiones || !cantidad || !color || !fecha_alta|| !fecha_baja|| !entradas|| !salidas|| !talla|| !stok) {
      mostrarMensaje('Por favor, complete todos los campos');
      return;
    }

    if (!esNumeroValido(cantidad)) {
      mostrarMensaje('La cantidad debe ser un número válido');
      return;
    }

    if (!esFechaValida(fecha_alta)) {
      mostrarMensaje('La fecha no es válida');
      return;
    }
    if (!esFechaValida(fecha_baja)) {
      mostrarMensaje('La fecha no es válida');
      return;
    }



    if (modoEdicion) {
      const nuevoInventario = [...inventario];
      nuevoInventario[indiceEdicion] = {
         proveedor,
        clave,
        nombre,
        tipo,
        dimensiones,
        cantidad,
        color,
        fecha_alta,
        fecha_baja,
        entradas,
        salidas,
        talla,
        stok,
        
      };
      setInventario(nuevoInventario);
      setModoEdicion(false);
      setIndiceEdicion(null);
      mostrarMensaje('Registro actualizado con éxito');
    } else {
      const nuevoItem = {
        proveedor,
        clave,
        nombre,
        tipo,
        dimensiones,
        cantidad,
        color,
        fecha_alta,
        fecha_baja,
        entradas,
        salidas,
        talla,
        stok,
        
      };
      setInventario([...inventario, nuevoItem]);
      mostrarMensaje('Registro agregado con éxito');

      setProveedor('');
      setClave('');
      setNombre('');
      setTipo('');
      setDimensiones('');
      setCantidad('');
      setColor('');
      setFecha_Alta('');
      setFecha_Baja('');
      setEntradas('');
      setSalidas('');
      setTalla('');
      setStok('');
      

  

      localStorage.setItem('inventario', JSON.stringify([...inventario, nuevoItem]));
    }
  };

  const esNumeroValido = (numero) => {
    return !isNaN(numero);
  };

  const esFechaValida = (fecha) => {
    const fechaRegexp = /^\d{4}-\d{2}-\d{2}$/;
    return fechaRegexp.test(fecha);
  };

  const editarInventario = (indice) => {
    const item = inventario[indice];
    setProveedor(item.proveedor);
    setClave(item.clave);
    setNombre(item.nombre);
    setTipo(item.tipo);
    setDimensiones(item.dimensiones);
    setCantidad(item.cantidad);
    setColor(item.color);
    setFecha_Alta(item.fecha_alta);
    setFecha_Baja(item.fecha_baja);
    setEntradas(item.entradas);
    setSalidas(item.salidas);
    setTalla(item.talla);
    setStok(item.stok);

    setModoEdicion(true);
    setIndiceEdicion(indice);
  };

  const eliminarInventario = (indice) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      const nuevoInventario = [...inventario];
      nuevoInventario.splice(indice, 1);
      setInventario(nuevoInventario);
      mostrarMensaje('Registro eliminado con éxito');
      localStorage.setItem('inventario', JSON.stringify(nuevoInventario));
    }
  };

  const cancelarEdicion = () => {
    setProveedor('');
    setClave('');
    setNombre('');
    setTipo('');
    setDimensiones('');
    setCantidad('');
    setColor('');
    setFecha_Alta('');
    setFecha_Baja('');
    setEntradas('');
    setSalidas('');
    setTalla('');
    setStok('');

    setModoEdicion(false);
    setIndiceEdicion(null);
  };

  const ordenarInventario = () => {
    const inventarioOrdenado = [...inventario];

    if (orden === 'asc') {
      inventarioOrdenado.sort((a, b) => a.clave.localeCompare(b.clave));
    } else {
      inventarioOrdenado.sort((a, b) => b.clave.localeCompare(a.clave));
    }

    return inventarioOrdenado;
  };

  const inventarioOrdenado = ordenarInventario();

  const regresarPagina = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Si no hay una página anterior en el historial, redireccionar a otra página
      window.location.href = "/otra-pagina";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', width: '80%', margin: '0 auto' }}>
      <h2>Registro de Inventario</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={agregarInventario} style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="Proveedor">Proveedor:</label>
          <input type="text" id="Proveedor" name="Proveedor" value={proveedor} onChange={(e) => setProveedor(e.target.value)} required /><br /><br />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="clave">Clave:</label>
          <input type="text" id="clave" name="clave" value={clave} onChange={(e) => setClave(e.target.value)} required /><br /><br />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required /><br /><br />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="tipo">Tipo:</label>
          <input type="text" id="tipo" name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required /><br /><br />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="dimensiones">Dimensiones:</label>
          <input type="text" id="dimensiones" name="dimensiones" value={dimensiones} onChange={(e) => setDimensiones(e.target.value)} required /><br /><br />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required /><br /><br />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="color">Color:</label>
          <input type="text" id="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} required /><br /><br />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="fecha_alta">Fecha_Alta:</label>
          <input type="date" id="fecha_alta" value={fecha_alta} onChange={(e) => setFecha_Alta(e.target.value)} required /><br /><br />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="fecha_baja">Fecha_Baja:</label>
          <input type="date" id="fecha_baja" value={fecha_baja} onChange={(e) => setFecha_Baja(e.target.value)} required /><br /><br />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="entradas">Entradas:</label>
          <input type="text" id="entradas" name="entradas" value={entradas} onChange={(e) => setEntradas(e.target.value)} required /><br /><br />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="salidas">Salidas:</label>
          <input type="text" id="salidas" name="salidas" value={salidas} onChange={(e) => setSalidas(e.target.value)} required /><br /><br />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="talla">Talla:</label>
          <input type="text" id="talla" name="talla" value={talla} onChange={(e) => setTalla(e.target.value)} required /><br /><br />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="stok">Stok</label>
          <input type="text" id="stok" name="stok" value={stok} onChange={(e) => setStok(e.target.value)} required /><br /><br />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }} className="agregarButtonContainer">
          <div style={{ marginRight: '5px', display: 'inline-block' }}>
            <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
          </div>
          {modoEdicion && (
            <div style={{ display: 'inline-block' }}>
              <button type="button" onClick={cancelarEdicion}>Cancelar</button>
            </div>
          )}
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>Inventario:</h3>
        <table>
          <thead>
            <tr>
            <th>Proveedor</th>
              <th>Clave</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Dimensiones</th>
              <th>Cantidad</th>
              <th>Color</th>
              <th>Fecha_Alta</th>
              <th>Fecha_Baja</th>
              <th>Entradas</th>
              <th>Salidas</th>
              <th>Talla</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {inventarioOrdenado.map((item, indice) => (
              <tr key={indice}>
                 <td>{item.proveedor}</td>
                <td>{item.clave}</td>
                <td>{item.nombre}</td>
                <td>{item.tipo}</td>
                <td>{item.dimensiones}</td>
                <td>{item.cantidad}</td>
                <td>{item.color}</td>
                <td>{item.fecha_alta}</td>
                <td>{item.fecha_baja}</td>
                <td>{item.entradas}</td>
                <td>{item.salidas}</td>
                <td>{item.talla}</td>
                <td>{item.stok}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => editarInventario(indice)}
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => eliminarInventario(indice)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <a className="boton-salir" href="INVENTARIO.js" onClick={regresarPagina} style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        Salir
      </a>
    </div>
  );
}

export default RegistroInventario;
