import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>SCX Core</h1>
        <p className="subtitle">React Components Documentation</p>
      </header>

      <main className="home-main">
        <section className="intro">
          <h2>Welcome to SCX Core</h2>
          <p>
            A comprehensive collection of React utilities and components for modern web development.
          </p>
        </section>

        <section className="components">
          <h2>Components</h2>
          <div className="component-list">
            <Link to="/components/button" className="component-item">
              <h3>Button</h3>
              <p>A versatile button component with multiple variants</p>
            </Link>

            <Link to="/components/card" className="component-item">
              <h3>Card</h3>
              <p>A flexible card component for content organization</p>
            </Link>

            <Link to="/components/counter" className="component-item">
              <h3>Counter</h3>
              <p>A simple counter component demo</p>
            </Link>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>Powered by SCX Core Documentation System</p>
      </footer>
    </div>
  );
}

export default Home;
