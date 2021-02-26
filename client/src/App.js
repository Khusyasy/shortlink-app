import { useState } from "react";

function App() {
    
    var [list, setList] = useState([]);

    var getList = () => {
        fetch('/api/getList')
            .then(response => response.json())
            .then(data => setList(data));
    }

    return (
        <div>
            {list.map(item => (<p key={item.id}>{item.name}</p>))}
            <button onClick={getList}>Get List</button>
        </div>
    );
}

export default App;
