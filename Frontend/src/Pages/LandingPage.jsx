import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Pixel Productivity! 🚀</h1>
      <p>Manage your tasks efficiently!</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
};

export default LandingPage;
