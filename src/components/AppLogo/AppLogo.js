import "./AppLogo.css";
import logo from "../../assets/logo/image2.png";

const AppLogo = () => {
  return (
    <div className="logoContainer">
      <img src={logo} alt="logo" />
    </div>
  );
};

export default AppLogo;
