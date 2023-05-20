import NavBar from "./Navbar";
import Footer from "./Footer";

export const PageLayout = (props) => {
    return (
        <>
            <NavBar />
            {props.children}
            <Footer />
        </>
    );
};