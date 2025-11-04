
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import { AuthContext } from '../App';

const HomePage: React.FC = () => {
    const auth = useContext(AuthContext);

    return (
        <Layout>
            <HeroSection />
            <AboutSection />
            <AlgorithmSection />
            <FeaturesSection />
            <CtaSection />
        </Layout>
    );
};

const HeroSection: React.FC = () => {
    const auth = useContext(AuthContext);
    return (
        <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
                            Hybrid Text Compression System
                        </h1>
                        <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-xl mx-auto md:mx-0">
                            Advanced lossless compression using Huffman Coding & LZW Algorithm.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button onClick={() => auth?.navigateTo('register')} className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105">
                                Get Started
                            </button>
                            <a href="#about" className="bg-white/10 border border-white/20 font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-transform transform hover:scale-105">
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex items-center gap-6">
                            <div className="flex-1 text-center bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-sm font-semibold text-slate-500 mb-2">Original Text</h3>
                                <div className="font-mono text-xs text-left bg-slate-100 text-slate-700 p-3 rounded-md truncate">Lorem ipsum dolor sit amet...</div>
                                <div className="mt-3 font-bold text-blue-600 text-lg">1.2 MB</div>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-white/80">
                                <Icon name="arrow-right" className="w-8 h-8 text-white"/>
                                <span className="text-xs font-semibold whitespace-nowrap">Hybrid Compression</span>
                            </div>
                            <div className="flex-1 text-center bg-white p-6 rounded-xl shadow-md">
                                <h3 className="text-sm font-semibold text-slate-500 mb-2">Compressed</h3>
                                <div className="font-mono text-xs text-left bg-emerald-100 text-emerald-800 p-3 rounded-md truncate">01101001...</div>
                                <div className="mt-3 font-bold text-emerald-600 text-lg">456 KB</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">About Our Hybrid Compression System</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <AboutCard icon="code-branch" title="Hybrid Algorithm" description="Combines the power of Huffman Coding and LZW compression to achieve optimal results for text data." />
                    <AboutCard icon="database" title="Lossless Compression" description="Guarantees perfect data recovery without any information loss, ideal for important documents." />
                    <AboutCard icon="globe" title="Web-Based Platform" description="Access from anywhere with our intuitive web interface. No software installation required." />
                </div>
            </div>
        </section>
    );
};

const AboutCard: React.FC<{icon: any; title: string; description: string}> = ({icon, title, description}) => (
    <div className="text-center p-8 bg-slate-50 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl mb-6 shadow-lg">
            <Icon name={icon} className="w-8 h-8"/>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500">{description}</p>
    </div>
);


const AlgorithmSection: React.FC = () => (
    <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
            <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-slate-200 hidden md:block"></div>
                <div className="space-y-12">
                    <AlgorithmStep num={1} title="LZW Compression" description="First, we apply the Lempel-Ziv-Welch algorithm to identify and replace repeating patterns with dictionary codes."/>
                    <AlgorithmStep num={2} title="Huffman Encoding" description="Then, we apply Huffman coding to assign shorter binary codes to more frequent symbols for optimal compression."/>
                    <AlgorithmStep num={3} title="Optimized Output" description="The result is a highly compressed file that maintains all original data while significantly reducing file size."/>
                </div>
            </div>
        </div>
    </section>
);

const AlgorithmStep: React.FC<{ num: number; title: string; description: string }> = ({ num, title, description }) => (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 relative">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 z-10">{num}</div>
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-slate-600">{description}</p>
        </div>
    </div>
);


const FeaturesSection: React.FC = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Key Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                <FeatureItem icon="cloud-upload" title="Easy Upload"/>
                <FeatureItem icon="history" title="Compression History"/>
                <FeatureItem icon="download" title="Instant Download"/>
                <FeatureItem icon="chart-bar" title="Performance Metrics"/>
                <FeatureItem icon="lock" title="Secure Processing"/>
                <FeatureItem icon="mobile" title="Mobile Friendly"/>
            </div>
        </div>
    </section>
);

const FeatureItem: React.FC<{ icon: any; title: string }> = ({ icon, title }) => (
    <div className="flex flex-col items-center gap-3">
        <Icon name={icon} className="w-12 h-12 text-blue-500"/>
        <h4 className="font-semibold text-slate-700">{title}</h4>
    </div>
);


const CtaSection: React.FC = () => {
    const auth = useContext(AuthContext);
    return(
    <section className="bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Start Compressing?</h2>
            <p className="text-lg text-slate-600 mb-8">Join thousands of users who trust our hybrid compression system.</p>
            <div className="flex justify-center gap-4">
                 <button onClick={() => auth?.navigateTo('register')} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                    Create Account
                </button>
                <button onClick={() => auth?.navigateTo('login')} className="bg-white text-slate-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-slate-50 border border-slate-200 transition-transform transform hover:scale-105">
                    Sign In
                </button>
            </div>
        </div>
    </section>
    );
};


export default HomePage;
