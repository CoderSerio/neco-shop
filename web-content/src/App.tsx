import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

declare global {
  interface Window {
    Flutter?: {
      postMessage: (message: string) => void;
    };
  }
}

/**
 * 导航到原生页面的函数
 */
const navigateToNative = (route: string) => {
  if (window.Flutter) {
    window.Flutter.postMessage(route);
  } else {
    console.warn("JS Bridge error");
  }
};

// 页面组件
const Home = () => (
  <div>
    <h1>首页</h1>
    <nav>
      <Link to="/">首页</Link> |<Link to="/about">关于</Link> |
      <Link to="/profile">个人中心</Link>
      <button onClick={() => navigateToNative("/settings")}>设置</button>
    </nav>
    <div style={{ marginTop: "20px" }}>
      <button onClick={() => navigateToNative("/settings")}>
        打开设置页面
      </button>
    </div>
  </div>
);

const About = () => <h1>关于页面</h1>;
const Profile = () => <h1>个人中心</h1>;
const NotFound = () => <h1>404 - 页面不存在</h1>;

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
