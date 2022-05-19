import React, { useReducer } from "react";
import "./App.css";
import BottonNumerico from "./BottonNumerico";
import BottonOperacion from "./BottonOperacion";


export const acciones_distintas = {
    AGREGAR_NUMERO : "agregar-digito",
    ESCOGER_OPERANDO : "escoger-operando",
    CLEAR : "clear",
    EVALUAR : "evaluar",
    SIGN : "signo"
}

function reducer(state, {type, payload}){
    switch(type){
        case acciones_distintas.AGREGAR_NUMERO:
            if (state.overwrite){
                return {
                    ...state,
                    numeroActual: payload.digito,
                    overwrite:false
                }
            }
            if (payload.digito === "0" && state.numeroActual === "0"){
                return state
            } 
            if (payload.digito === "." && state.numeroActual.includes(".")) {
                return state
            }
            return {
                ...state,
                numeroActual: `${state.numeroActual || ""}${payload.digito}`
            }

        case acciones_distintas.SIGN:
            ///revisar esta parte
            if( state.numeroActual == null){
                return{
                    state
                }
            }
            return {
                ...state,
                numeroActual:  state.numeroActual * -1

            }
            
        case acciones_distintas.CLEAR:
         
                return {

                

            }
            

        case acciones_distintas.EVALUAR:
            if (state.operacion == null || 
                state.numeroActual == null  ||
                 state.numeroAntes == null){
                return state
            }
            return{
                ...state,
                overwrite: true,
                numeroAntes: null,
                operacion: null,
                numeroActual: evaluar(state)
            }

        case acciones_distintas.ESCOGER_OPERANDO:
            if (state.numeroActual == null && state.numeroAntes == null){
                return state
            }
            if (state.numeroActual == null){
                return{
                    ...state,
                    operacion: payload.operacion
                }
            }
            if (state.numeroAntes  == null){
                return{
                    ...state,
                    operacion : payload.operacion,
                    numeroAntes: state.numeroActual,
                    numeroActual : null
                }
                
            }
            return{
                ...state,
                numeroAntes: evaluar(state),
                operacion: payload.operacion,
                numeroActual: null
            }
        
    }

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





function App(){
    const [{ numeroAntes, numeroActual, operacion }, dispatch] = useReducer(reducer,{})





        return(

            <div class= "fondo">
                <br></br>

            <div class = "titulo">
                <h1> Calculadora de Kristen</h1>
            </div>

            <div class= "calculadora">
                <div class= "pantalla calculadora-display">
                    <div class = "numero-antes">{formatoNum(numeroAntes)} {operacion}</div>
                    <div class = "numero-actual">{formatoNum(numeroActual)}</div>
                </div>

                <div class = "numero">

                    
                    <div class="row">
                        <div class="col-sm">
                            <button class = "button buttons-lightg" onClick= {() => dispatch({type: acciones_distintas.CLEAR})}>AC</button>
                        </div>
                        <div class="col-sm">
                            <BottonOperacion operacion="+/-" dispatch={dispatch}></BottonOperacion>
                        </div>
                        <div class="col-sm">
                            <BottonOperacion operacion="%" dispatch={dispatch}></BottonOperacion>
                        </div>
                        <div class="col-sm">
                            <BottonOperacion operacion="÷" dispatch={dispatch}></BottonOperacion>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-sm">
                            <BottonNumerico digito="7" dispatch={dispatch}></BottonNumerico>
                        </div>
                        <div class="col-sm">
                        <BottonNumerico digito="8" dispatch={dispatch}></BottonNumerico>
                        </div>
                        <div class="col-sm">
                            <BottonNumerico digito="9" dispatch={dispatch}></BottonNumerico>
                        </div>
                        <div class="col-sm">
                        <BottonOperacion operacion="x" dispatch={dispatch}></BottonOperacion>
                         </div>
                    </div>

                    <div class="row">
                        <div class="col-sm">
                            <BottonNumerico digito="4" dispatch={dispatch}></BottonNumerico>
                            </div>
                        <div class="col-sm">
                            <BottonNumerico digito="5" dispatch={dispatch}></BottonNumerico>
                            </div>
                            <div class="col-sm">
                            <BottonNumerico digito="6" dispatch={dispatch}></BottonNumerico>
                            </div>
                            <div class="col-sm">
                            <BottonOperacion operacion="-" dispatch={dispatch}></BottonOperacion>
                            </div>
                    </div>

                    <div class="row">
                        <div class="col-sm">
                        <BottonNumerico digito="1" dispatch={dispatch}></BottonNumerico>
                            </div>
                            <div class="col-sm">
                            <BottonNumerico digito="2" dispatch={dispatch}></BottonNumerico>
                            </div>
                            <div class="col-sm">
                            <BottonNumerico digito="3" dispatch={dispatch}></BottonNumerico>
                            </div>
                            <div class="col-sm">
                            <BottonOperacion operacion="+" dispatch={dispatch}></BottonOperacion>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <BottonNumerico class = "border-def" digito="0" dispatch={dispatch}></BottonNumerico>
                        </div>
                         <div class="col-3">
                            <BottonNumerico digito="." dispatch={dispatch}></BottonNumerico>
                        </div>

                        <div class="col-3">
                        <button class = "button buttons-orange" onClick= {() => dispatch({type: acciones_distintas.EVALUAR})} >=</button>
                        </div>
                    </div>

                </div>  
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            



        </div>

    )
}


export default App;
