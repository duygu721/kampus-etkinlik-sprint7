import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <div className="header-kapsayici">
        <div>
          <h1>
            <Link to="/">Kampüs Etkinlikleri</Link>
          </h1>
          <p>
            Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
          </p>
        </div>
      </div>
    </header>
  );
}
