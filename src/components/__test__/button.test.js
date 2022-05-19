import React from "react";
import  ReactDOM  from "react-dom";
import BottonNumerico from "../BottonNumerico";
import BottonOperacion from "../BottonOperacion";
import acciones_distintas from "../App.js";

import { cleanup } from "@testing-library/react";

const formato = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })

function formatoNum(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null){
        if (integer > 999999999 || (integer < 0)){
            return "ERROR"
        }
        return formato.format(integer) 
    } 
    if (formato.format(integer).length <= 3){
        return `${formato.format(integer)}.${decimal}`.substring(0,9)
    }
    if (formato.format(integer).length <= 7 && formato.format(integer).length > 4){
        return `${formato.format(integer)}.${decimal}`.substring(0,10)
    }
    if (formato.format(integer).length <= 11 && formato.format(integer).length > 8){
        console.log(formato.format(integer).length)
        return `${formato.format(integer)}.${decimal}`.substring(0,11)
    }
    return `${formato.format(integer)}.${decimal}`
  }


function evaluar({numeroActual, numeroAntes, operacion}){
    const antes = parseFloat(numeroAntes)
    const ahorita = parseFloat(numeroActual)
    if (isNaN(antes) || isNaN(ahorita)){
        return ""
    }
    let computo = ""
    switch (operacion){
        case "+":
            computo = antes + ahorita
            break
        case "-":
            computo = antes - ahorita
            break
        case "x":
            computo = antes * ahorita
            break
        case "÷":
            computo = antes / ahorita
            break
        case "%":
            computo = antes % ahorita
            break
        case "+/-":
            alert("Boton no implementado")
            break

        
    }
    return computo.toString()

}
afterEach(cleanup);

it("hace render sin problema del botton largo de 0", ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<BottonNumerico digito="0" dispatch={acciones_distintas.AGREGAR_NUMERO}></BottonNumerico>, div)
})

it("hace render sin problema los botones numericos", ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<BottonNumerico digito="7" dispatch={acciones_distintas.AGREGAR_NUMERO}></BottonNumerico>, div)
})

it("hace render sin problema los botones de operaciones", ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<BottonOperacion operacion="+" dispatch={acciones_distintas.ESCOGER_OPERADO}></BottonOperacion>,div)
})

it('suma', () => {
        let numeroActual = "2";
        let numeroAntes = "4";
        let  operacion = "+";
        let sum = evaluar({numeroAntes,numeroActual, operacion});
        expect(sum).toBeDefined();
        expect(sum).toEqual("6");
    })

it('resta', () => {
        let numeroActual = "2";
        let numeroAntes = "4";
        let  operacion = "-";
        let sum = evaluar({numeroAntes,numeroActual, operacion});
        expect(sum).toBeDefined();
        expect(sum).toEqual("2");
 })

 it('multiplicación', () => {
    let numeroActual = "2";
    let numeroAntes = "4";
    let  operacion = "x";
    let sum = evaluar({numeroAntes,numeroActual, operacion});
    expect(sum).toBeDefined();
    expect(sum).toEqual("8");
})

it('division', () => {
    let numeroActual = "2";
    let numeroAntes = "4";
    let  operacion = "÷";
    let sum = evaluar({numeroAntes,numeroActual, operacion});
    expect(sum).toBeDefined();
    expect(sum).toEqual("2");
})

it('modulo', () => {
    let numeroActual = "2";
    let numeroAntes = "4";
    let  operacion = "%";
    let sum = evaluar({numeroAntes,numeroActual, operacion});
    expect(sum).toBeDefined()
    expect(sum).toEqual("0")
})

it('formato num', () => {
    let operando = "12824.9";
    let sum = formatoNum(operando);
    expect(sum).toBeDefined();
    expect(sum).toEqual("12,824.9")
})


