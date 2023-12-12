import {useState} from "react";

const Test = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>{count}</div>
            <button type="button" onClick={() => setCount(count + 1)}>++++</button>
        </>
    )
}

export default Test;
