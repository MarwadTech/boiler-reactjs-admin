import { useState } from "react";
import { colorCode } from "../Assets/Index";

export const RadioButton = ({ label, active, setActive }) => {
    const [stateLabel] = useState(label); // Removed unnecessary state

    return (
        <div className="w-100 cursor-pointer text-center" onClick={() => setActive(stateLabel)}>
            <h6 style={{ color: active === stateLabel ? colorCode : '#808080' }}>
                <b>{stateLabel.charAt(0).toUpperCase() + stateLabel.slice(1)}</b>
            </h6>
            <hr className="opacity-100 border-5 m-0" style={{ borderColor: active === stateLabel ? colorCode : '#80808080' }} />
        </div>
    );
};


