import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import BlogContent from './components/BlogContent/BlogContent';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <BlogContent/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
