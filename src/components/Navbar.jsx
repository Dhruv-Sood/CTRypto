import { FaGithub } from "react-icons/fa";
import HyperText from "./magicui/hyper-text";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 w-full">
            <div className="logo font-bold text-xl">
                <HyperText text={"CTRypto"} />
            </div>
            <ul className="list-items flex gap-4 items-center">
                
                    <HyperText className={"text-xl"} text={"Home"} />
                <span className="text-gray-500">/</span>
                
                
                    <HyperText className={"text-xl"} text={"Services"} />
                    <span className="text-gray-500">/</span>


                    <HyperText className={"text-xl"} text={"About"} />

            </ul>
            <div>
                <FaGithub size={24} />
            </div>
        </nav>
    );
}

export default Navbar;
