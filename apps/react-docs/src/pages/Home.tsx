import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>SCX Core</h1>
        <p className="subtitle">React 组件库文档</p>
      </header>

      <main className="home-main">
        <section className="intro">
          <h2>欢迎使用 SCX Core</h2>
          <p>现代化 Web 开发的 React 工具和组件库集合</p>
        </section>

        <section className="components">
          <h2>组件列表</h2>
          <div className="component-list">
            <Link to="/components/a-map" className="component-item">
              <h3>AMap 高德地图</h3>
              <p>集成高德地图的 React 组件</p>
            </Link>

            <Link to="/components/caption" className="component-item">
              <h3>Caption 标题</h3>
              <p>带有装饰性背景条的标题组件</p>
            </Link>

            <Link to="/components/card" className="component-item">
              <h3>Card 卡片</h3>
              <p>基础卡片组件</p>
            </Link>

            <Link to="/components/gradient-border" className="component-item">
              <h3>GradientBorder 渐变边框</h3>
              <p>带有渐变边框的容器组件</p>
            </Link>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>由 SCX Core 文档系统提供支持</p>
      </footer>
    </div>
  );
}

export default Home;
