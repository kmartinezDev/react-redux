import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types'

import { axiosClient } from '../config/axios'
import Swal from 'sweetalert2'

// Crear nuevos productos
export const crearNuevoProductoAction = (producto) => {
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {
            await axiosClient.post('/productos', producto)
            dispatch(agregarProductoExito(producto))

            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } 
        catch (error) {
            console.log(error)
            dispatch(agregarProductoError(true))

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
}) 

const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
})

// Funcion que descarga los productos de la base de datos 
export const obtenerProductosAction = () => {
    return async (dispatch) => {
        dispatch(descargarProductos())
        
        try {

            // setTimeout( async ()=>{
            //     const respuesta = await axiosClient.get('productos')
            //     dispatch(descargaProductosExitosa(respuesta.data))  
            // }, 3000)

            const respuesta = await axiosClient.get('productos')
            dispatch(descargaProductosExitosa(respuesta.data))    
        } 
        catch (error) {
            console.log(error)
            dispatch(descargaProductosError(true))
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true    
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = error => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: error
})

// Selecciona y elimina producto
export const borrarProductoAction = id => {
    return async dispatch => {
        dispatch(obtenerProductoEliminar(id))

        try {
            await axiosClient.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())
            
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente.',
                'success'
            )
        } 
        catch (error) {
            console.log(error)
            dispatch(eliminarProductoError(true))
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = error => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: error
})

// Obtiene el producto a modificar
export const obtenerProductoEditarAction = producto => {
    return dispatch => {
        dispatch(obtenerProductoEditar(producto))
    }
}

const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Editar un registro en la api y state 
export const editarProductoAction = producto => {
    return async dispatch => {
        dispatch(editarProducto())

        try {
            await axiosClient.put(`/productos/${producto.id}`, producto)    
            dispatch(editarProductoExito(producto))
        } 
        catch (error) {
            dispatch(editarProductoError(error))
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

const editarProductoError = error => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: true
})