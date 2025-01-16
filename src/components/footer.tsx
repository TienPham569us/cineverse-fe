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
      Discover a world of movies tailored to your preferences. Our advanced recommendation system helps you find the perfect film for any mood, genre, or keyword. Explore detailed information, including summaries, reviews, ratings, and similar suggestions. Save your favorites, track your search history, and enjoy a personalized movie-watching experience. Dive into endless entertainment, curated just for you!
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
