"use client";
import { FaFacebook, FaInstagram , FaTwitter, FaLinkedin } from "react-icons/fa";

const CustomFooter = () => {
  return (
    <div className="footer bg-black/25 text-white py-6">
      <ul className="more-info flex items-center justify-center pb-4 text-[16px] font-semibold">
        <li className="info mx-2 cursor-pointer hover:text-pink-500">Terms of Use</li>
        <li className="info mx-2 cursor-pointer hover:text-pink-500">Privacy Policy</li>
        <li className="info mx-2 cursor-pointer hover:text-pink-500">About</li>
        <li className="info mx-2 cursor-pointer hover:text-pink-500">Blog</li>
      </ul>
      <div className="description px-8 text-center text-[14px] leading-[20px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mauris nec facilisis sagittis. Aliquam et nulla efficitur, porta elit nec, hendrerit erat. Nulla egestas neque vestibulum nisl fringilla, at iaculis elit posuere. Nunc iaculis nisl non ipsum tincidunt, eu sagittis metus rutrum. In orci lacus, facilisis consequat mi sit amet, finibus aliquam purus. Sed vulputate maximus nulla, at pretium nibh tempor et. Sed pretium viverra libero, ut pretium enim congue auctor.
      </div>
      <ul className="social-media flex items-center justify-center pt-9">
        <li className="item mx-8 text-[18px] cursor-pointer hover:text-pink-500 hover:shadow-pink-500 hover:shadow-lg">
          <FaFacebook />
        </li>
        <li className="item mx-8 text-[18px] cursor-pointer hover:text-pink-500 hover:shadow-pink-500 hover:shadow-lg">
          <FaInstagram />
        </li>
        <li className="item mx-8 text-[18px] cursor-pointer hover:text-pink-500 hover:shadow-pink-500 hover:shadow-lg">
          <FaTwitter />
        </li>
        <li className="item mx-8 text-[18px] cursor-pointer hover:text-pink-500 hover:shadow-pink-500 hover:shadow-lg">
          <FaLinkedin />
        </li>
      </ul>
    </div>
  );
};

export default CustomFooter;
