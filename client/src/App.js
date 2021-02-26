import { useState } from "react";

function App() {
    
    var [links, setLinks] = useState([]);

    var getLinks = () => {
        fetch('/api/getLinks')
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    setLinks(data.links)
                }
            });
    }

    return (
        <div>
            {links.map(link => (<p key={link._id}>{link.long}</p>))}
            <button onClick={getLinks}>Get Links</button>
        </div>
    );
}

export default App;
