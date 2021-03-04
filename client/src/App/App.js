import { useState } from "react";
import axios from "axios";

function App() {
    
    var [links, setLinks] = useState([]);

    var getLinks = async () => {
        axios.get('/api/getLinks')
            .then(res => {
                var data = res.data;
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
