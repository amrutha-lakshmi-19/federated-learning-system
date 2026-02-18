import { Link } from "react-router-dom";


export default function Navbar() {
return (
<header className="navbar">
<h2>Federated Learning</h2>
<nav>
<Link to="/">Home</Link>
<Link to="/dashboard">Server Dashboard</Link>
<Link to="/global-model">Global Model</Link>
<Link to="/privacy">Privacy</Link>
<Link to="/about">About</Link>
</nav>
</header>
);
}

