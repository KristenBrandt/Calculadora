import React from "react"
import { acciones_distintas } from "./App"

export default function BottonOperacion ({dispatch, operacion}){

    
    if (operacion == "x" || operacion == "-" || operacion == "+"  || operacion == "=" || operacion == "==" || operacion == "÷"){
        return (
            <button class = "button buttons-orange" onClick={() => dispatch({ type: acciones_distintas.ESCOGER_OPERANDO, payload: {operacion}})}>{operacion}</button>
        )
    }else {
        return (
            <button class = "button buttons-lightg" onClick={() => dispatch({ type: acciones_distintas.ESCOGER_OPERANDO, payload: {operacion}})}>{operacion}</button>
        )
    }
    
}