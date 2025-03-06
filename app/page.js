// pages/index.js
import Footer from './components/Footer';
import Navbar from './components/Navbar'; // Corrected import path and component name
import RightIconSmartphone from './components/SmartphoneCartIcon/RightIconSmartphone';

import ForHerHome from './ForHerHome';

export default function Home() {

    return (
        <div className='Main '>
            
            <Navbar />
            <ForHerHome/>
            <RightIconSmartphone/>    {/* this component has static cart icon in left, right slideshow */}
            <Footer/>
        </div>
    );
}