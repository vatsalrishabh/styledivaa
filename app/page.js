// pages/index.js
import Head from 'next/head';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RightIconSmartphone from './components/SmartphoneCartIcon/RightIconSmartphone';
import { seoMetadata } from "./SEO/seoMetadata";
import ForHerHome from './ForHerHome';

export default function Home() {
    return (
        <div className='Main'>
            {/* SEO Meta Tags */}
            <Head>
                {/* Basic SEO */}
                <title>{seoMetadata.title}</title>
                <meta name="description" content={seoMetadata.description} />
                <meta name="keywords" content={seoMetadata.keywords} />
                <meta name="author" content={seoMetadata.authors[0].name} />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href={seoMetadata.openGraph.url} />

                {/* Open Graph (Facebook, LinkedIn) */}
                <meta property="og:type" content={seoMetadata.openGraph.type} />
                <meta property="og:url" content={seoMetadata.openGraph.url} />
                <meta property="og:title" content={seoMetadata.openGraph.title} />
                <meta property="og:description" content={seoMetadata.openGraph.description} />
                {seoMetadata.openGraph.images.map((image, index) => (
                    <meta key={index} property="og:image" content={image.url} />
                ))}

                {/* Twitter SEO */}
                <meta name="twitter:card" content={seoMetadata.twitter.card} />
                <meta name="twitter:title" content={seoMetadata.twitter.title} />
                <meta name="twitter:description" content={seoMetadata.twitter.description} />
                {seoMetadata.twitter.images.map((image, index) => (
                    <meta key={index} name="twitter:image" content={image} />
                ))}

                {/* JSON-LD Schema Markup for Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "StyleDivaa",
                            "url": seoMetadata.openGraph.url,
                            "logo": seoMetadata.openGraph.images[0].url,
                            "sameAs": [
                                "https://www.facebook.com/styledivaa",
                                "https://www.instagram.com/style_diva33",
                                "https://www.linkedin.com/company/styledivaa",
                                seoMetadata.openGraph.url
                            ],
                            "description": seoMetadata.description
                        })
                    }}
                />
            </Head>

            {/* Page Content */}
            <Navbar />
            <ForHerHome />
            <RightIconSmartphone /> {/* Static cart icon & slideshow */}
            <Footer />
        </div>
    );
}
