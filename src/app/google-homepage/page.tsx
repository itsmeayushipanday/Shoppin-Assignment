import Header from "./Header";
import MainSection from "./MainSection";
import Footer from "./Footer";

export default function GoogleHomepage() {
    return (
        <div className="google-homepage min-h-screen flex flex-col">
            <Header />
            <MainSection />
            {/* <Footer /> */}
        </div>
    );
}
