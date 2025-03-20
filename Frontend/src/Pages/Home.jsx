import { Link, useNavigate } from "react-router-dom";
import "../style/home.css";
import { logout } from "../Services/authService";

function Home() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="home-container">
            <h1 className="home-title">🔥Welcome to Pixel Todo 🔥</h1>
            {/* <p className="home-text">Manage your tasks with the **power of fire!**   */}
            {/* Burn through your todos with **unstoppable energy.** </p> */}

            <div className="btn-container">
                <Link to="/todo">
                    <button className="home-button"> Todo </button>
                </Link>

                <Link to="/quick">
                    <button className="home-button"> Quick-Notes</button>
                </Link>

                <Link to="/pomodoro">
                    <button className="home-button"> Pomodoro Timer </button>
                </Link>

                <button className="home-button" onClick={handleLogout}>Logout</button>

                {/* <Link to="/daily">
                    <button className="home-button"> Dashboard </button>
                </Link> */}
            </div>
        </div>
    )
}

export default Home;