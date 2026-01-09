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
            <Link to="/components/button" className="component-item">
              <h3>Button 按钮</h3>
              <p>功能多样的按钮组件，支持多种样式</p>
            </Link>

            <Link to="/components/card" className="component-item">
              <h3>Card 卡片</h3>
              <p>灵活的内容组织卡片组件</p>
            </Link>

            <Link to="/components/counter" className="component-item">
              <h3>Counter 计数器</h3>
              <p>简单的计数器组件演示</p>
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
