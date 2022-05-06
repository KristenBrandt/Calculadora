
import React, { useState } from 'react'

const Cal = () => {
    const [cal, setCal] = useState("");
    const [result, setResult] = useState("");

    const updateCal = (e) => {
        setCal(cal.concat(e.target.name));
    }

    const clear = () => {
        setCal("");
        setResult("");
    }
}
