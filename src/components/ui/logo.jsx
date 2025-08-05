import logoImg from "../../assets/Images/logo.png";

const Logo = () => {
    return (
        <div className="h-11 w-16 flex items-center justify-center">
            <img
                src={logoImg}
                alt="Logo"
                className="h-full w-full object-contain scale-125"
            />
        </div>
    );
};

export default Logo;
