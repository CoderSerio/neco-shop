import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Message from "./pages/message";

const About = () => <h1>关于页面</h1>;
const Profile = () => (
  <div style={{ height: "100vh", background: "blue" }}>个人中心</div>
);
const NotFound = () => <h1>404 - 页面不存在</h1>;

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/message" element={<Message />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
