import "./app.scss";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Init from "@/components/init/Init";

const App = () => {
  return (
    <div>
      <section id="Homepage">
        <Navbar />
        <Init />
      </section>
      <section id="Services">2</section>
      <section id="Portfolio">3</section>
      <section id="Contact">
        4<Footer />
      </section>
    </div>
  );
};

export default App;
