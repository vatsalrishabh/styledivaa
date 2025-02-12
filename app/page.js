// pages/index.js
import Footer from './components/Footer';
import ForHer from './components/ForHer';
import Navbar from './components/Navbar'; // Corrected import path and component name
import RightSlideCart from './components/RightSlideCart';
import ForHerHome from './ForHerHome';

export default function Home() {

    return (
        <div className='Main '>
            
            <Navbar />
            <RightSlideCart/>
            <ForHerHome/>
            <Footer/>
        </div>
    );
}