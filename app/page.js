// pages/index.js
import Navbar from './components/Navbar'; // Corrected import path and component name

export default function Home() {
    return (
        <>
            <Navbar />
            {/* Rest of your page content */}
            <h1>Home Page Content</h1>
        </>
    );
}