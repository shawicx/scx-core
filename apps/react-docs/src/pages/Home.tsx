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
            <Link to="/preview-example" className="component-item">
              <h3>预览容器示例</h3>
              <p>文档预览容器组件的使用示例</p>
            </Link>

            <h3>UI 组件</h3>

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

            <h3>Hooks</h3>
            <Link to="/hooks/use-counter" className="component-item">
              <h3>useCounter 计数器</h3>
              <p>简单的计数器 Hook</p>
            </Link>

            <Link to="/hooks/use-toggle" className="component-item">
              <h3>useToggle 切换</h3>
              <p>布尔值切换 Hook</p>
            </Link>

            <Link to="/hooks/use-local-storage" className="component-item">
              <h3>useLocalStorage 本地存储</h3>
              <p>本地存储同步 Hook</p>
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
