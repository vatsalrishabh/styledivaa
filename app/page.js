// pages/index.js
import Footer from './components/Footer';
import Navbar from './components/Navbar'; // Corrected import path and component name
import RightSlideCart from './components/RightSlideCart';

export default function Home() {

    return (
        <div className='Main '>
            
            <Navbar />
            
            <RightSlideCart/>
            <Footer/>
        </div>
    );
}