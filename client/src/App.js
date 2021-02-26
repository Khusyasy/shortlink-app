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
            {links.map(link => (<div key={link._id}>
                <p>{link.longUrl} {link.shortUrl} {link.createdBy}</p>
            </div>))}
            <button onClick={getLinks}>Get Links</button>
        </div>
    );
}

export default App;
