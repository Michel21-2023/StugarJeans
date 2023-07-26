import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';


const RegistroProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rfc, setRFC] = useState('');
  const [direccion, setDireccion] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');

  const proveedorExiste = ( nombre,telefono, rfc,direccion) => {
    return proveedores.some(
      (proveedor) =>
        proveedor.nombre === nombre ||
        proveedor.telefono === telefono ||
        proveedor.rfc === rfc ||
        proveedor.direccion === direccion
    );
  };

  const agregarProveedor = () => {
    const proveedor = {
      nombre,
      telefono,
      rfc,
      direccion,
      
    };

    setProveedores([...proveedores, proveedor]);
  };
  const regresarPagina = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Si no hay una página anterior en el historial, redireccionar a otra página
      window.location.href = "/otra-pagina";
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (proveedorExiste( nombre,telefono,rfc, direccion)) {
      setErrorMensaje('Los datos ingresados ya existen para otro proveedor.');
      limpiarMensajeError();
      return;
    }

    if ( !nombre || !telefono|| !rfc || !direccion) {
      setErrorMensaje('Todos los campos son obligatorios. Por favor, completa todos los campos.');
      limpiarMensajeError();
      return;
    }

    agregarProveedor();

    setNombre('');
    setTelefono('');
    setRFC('');
    setDireccion('');
    setErrorMensaje('Proveedor registrado con éxito.');
    limpiarMensajeError();
  };

  const handleCancelarClick = () => {
    if ( !nombre && !telefono && !rfc && !direccion) {
      setErrorMensaje('No hay nada que cancelar por el momento.');
      limpiarMensajeError();
    } else {
      setNombre('');
      setTelefono('');
      setRFC('');
      setDireccion('');
      setErrorMensaje('');
    }
  };

  const limpiarMensajeError = () => {
    setTimeout(() => {
      setErrorMensaje('');
    }, 3000); // Mostrar el mensaje de error durante 3 segundos
  };

  useEffect(() => {
    const storedProveedores = localStorage.getItem('proveedores');
    if (storedProveedores) {
      setProveedores(JSON.parse(storedProveedores));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
  }, [proveedores]);

  const data = useMemo(() => proveedores, [proveedores]);

  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Teléfono',
        accessor: 'telefono',
      },
      {
        Header: 'RFC',
        accessor: 'rfc',
      },
      {
        Header: 'Dirección',
        accessor: 'direccion',
      },
    
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', textAlign: 'center', maxWidth: '600px' }}>
        <h1>Registro de Proveedor</h1>
        <form onSubmit={handleFormSubmit}>

          <label htmlFor="nombre">Nombre proveedor:</label>
          <br />
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <br />
          <label htmlFor="telefono">Telefono:</label>
          <br />
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <br />
          <label htmlFor="rfc">RFC:</label>
          <br />
          <input
            type="text"
            id="rfc"
            value={rfc}
            onChange={(e) => setRFC(e.target.value)}
          />
          <br />
          <label htmlFor="direccion">Dirección:</label>
          <br />
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Registrar Proveedor</button>
          <br />
          <br />
          <button type="button" onClick={handleCancelarClick}>
            Cancelar
          </button>
        </form>
        {errorMensaje && <p style={{ color: 'red' }}>{errorMensaje}</p>}
        <br />
        <h2>Lista de Proveedores</h2>
        <table {...getTableProps()} style={{ width: '100%', border: '1px solid black', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} style={{ background: '#ccc' }}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} style={{ padding: '10px', borderBottom: '1px solid black' }}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} style={{ padding: '10px', borderRight: '1px solid black' }}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <a className="boton-salir" href="registroproveedor" onClick={regresarPagina} style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        Salir
      </a>
    </div>
  );
};

export default RegistroProveedor;

