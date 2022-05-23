import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";
import style from "./navStyle";

import logo from "../../images/logo2.png";

const NavBarItem = ({ title, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      <a href="#">{title}</a>
    </li>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-60 h-30 cursor-pointer" />
      </div>

      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "About", "Blog", "Contact"].map(
          (item, index) => (
            <NavBarItem key={item + index} title={item} />
          )
        )}

        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>

      <div className="flex relative text-white md:hidden">
        {/* {isOpen ? (
          <AiOutlineClose
            fontSize={28}
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <GiHamburgerMenu
            fontSize={28}
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )} */}

        <GiHamburgerMenu
          fontSize={28}
          className="absolute -top-5 right-0 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />

        {
          <Menu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            styles={style}
            width={200}
            right
          >
            {["Market", "Exchange", "About", "Blog", "Contact"].map(
              (item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classProps={"flex flex-col mr-10"}
                />
              )
            )}
          </Menu>
        }
      </div>
    </nav>
  );
}
