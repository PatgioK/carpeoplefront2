import { Link } from "react-router-dom";


function NavBar () {
    return (
        <div>
            <h1> Car People App</h1>
            <br></br>
            <Link className="Link" to='/'>Home</Link>
            <Link className="Link" to='/person'>Person</Link>
        </div>
    )
}

export default NavBar;