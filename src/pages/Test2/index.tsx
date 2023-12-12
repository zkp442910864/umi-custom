import {useRef, useState} from "react";

const Test = () => {
    const [, update] = useState({});
    const ref = useRef(0);

    return (
        <>
            <div>{ref.current}</div>
            <button type="button" onClick={() => {ref.current++;update({})}}>++++</button>
        </>
    )
}

export default Test;
