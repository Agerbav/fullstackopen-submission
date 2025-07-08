import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// do "npm install axios" to install axios (used to get data from server)
// do "npm install json-server --save-dev" to install json server
// Add below to scripts field in packages.json for easier starting of json-server
// "server": "json-server -p 3001 db.json"
