import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <header className="top-menu mb-20">
      <p className="navbar-logo font-semibold text-center text-[#70BABB] text-xl">
        Доставка еды "Азбука вкуса"
      </p>
      <ul className="menu-main">
        <li>
          <Link to={"/about"} className="">
            О нас
          </Link>
        </li>
        <li>
          <Link to={"/"} className="">
            Рестораны
          </Link>
        </li>
        <li>
          <Link to={"/cart"} className="">
            Корзина
          </Link>
        </li>
        <li>
          <Link to={"/reviews"} className="">
            Отзывы
          </Link>
        </li>
        <li>
          <Link to={"/contacts"} className="">
            Контакты
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
