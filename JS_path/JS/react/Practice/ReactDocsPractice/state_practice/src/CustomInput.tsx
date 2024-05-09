import { useState } from "react";

// interface InputProps {
//     onChange: ()
// }

function CustomInput({ onChange }) {
    // const [value, setValue] = useState("");

    return (
        <input
        type="text"

        onChange={onChange}
        />
    );
}

export default CustomInput