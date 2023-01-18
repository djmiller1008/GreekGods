import React, { useState } from "react";
import GodCreate from "./GodCreate";
import EmblemCreate from "./EmblemCreate";
import AbodeCreate from "./AbodeCreate";


export const CreateIndex = () => {
    
    const [createType, setCreateType] = useState({
        form: <GodCreate />,
        type: 'god'
    })

    const handleInput = (e) => {
        let type = e.target.value;
        if (type === 'god') {
            setCreateType({ type: 'god', form: <GodCreate /> })
        } else if (type === 'emblem') {
            setCreateType({ type: 'emblem', form: <EmblemCreate /> })
        } else if (type === 'abode') {
            setCreateType({ type: 'abode', form: <AbodeCreate /> })
        }
    }

    return (
        <div>
            <h1>Create Something New</h1>
            <select onChange={e => handleInput(e)}>
                <option value="god">God</option>
                <option value="emblem">Emblem</option>
                <option value="abode">Abode</option>
            </select>
            <h4>Create a new {createType.type}</h4>
            {createType.form}
        </div>
    )
}