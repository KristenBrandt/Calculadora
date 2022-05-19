import React from "react"
import { acciones_distintas } from "./App"

export default function BottonNumerico ({dispatch, digito}){
    if (digito == "0"){
        return (
            <button data-testid = "botton1" class = "button buttons-grey2" onClick={() => dispatch({ type: acciones_distintas.AGREGAR_NUMERO, payload: {digito}})}>{digito}</button>
        )
    }
    return (
        <button data-testid = "botton1" class = "button buttons-grey" onClick={() => dispatch({ type: acciones_distintas.AGREGAR_NUMERO, payload: {digito}})}>{digito}</button>
    )
}