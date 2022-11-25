"use client";
import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";


const Navbar = () => {
  return (
    <div className="h-[108px] fixed inset-x-0 top-0 flex items-center bg-[#141A31] z-40">
      <Container xxxl className="relative flex items-center justify-between w-full">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Logo />
            <div className="text-3xl font-bold leading-7 tracking-normal text-white uppercase">
              MetaGallery
            </div>
          </div>
        </Link>
      </Container>
    </div>
  );
};

export default Navbar;
