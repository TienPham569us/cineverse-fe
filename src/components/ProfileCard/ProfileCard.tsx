import { Profile } from "@/types/profile/profile.response";
import dayjs from "dayjs";
import Img from "../Img";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import PosterFallback from "@/assets/no-poster.png";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/actions/authActions";
import { AppDispatch } from "@/lib/redux/store";

const ProfileCard = ({ profile }: { profile: Profile | null}) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        window.location.href = '/login';
        dispatch(logout());
        
      };

    return (
        profile != null &&
        <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-lg shadow-md">
          {/* Background decoration */}
          <div className="absolute inset-0 z-0 flex justify-between items-center overflow-hidden">
            <div className="h-24 w-2 bg-pink-500 transform rotate-45"></div>
            <div className="h-24 w-2 bg-pink-500 transform -rotate-45"></div>
            <div className="h-24 w-2 bg-purple-700 transform rotate-45"></div>
            <div className="h-24 w-2 bg-purple-700 transform -rotate-45"></div>
          </div>

          {/* Profile Content */}
          <div className="relative flex items-center justify-between space-x-6">
            <div className="flex items-center space-x-6">
                {/* Avatar */}
                <div className="h-16 w-16">
                <img
                    src="https://as1.ftcdn.net/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"
                    alt="Avatar"
                    className="h-full w-full rounded-full object-cover"
                />
                </div>

                {/* Info */}
                <div>
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <p className="text-sm py-1">Email: {profile.email}</p>
                <p className="text-sm py-1">Member since {dayjs(profile.createdAt).format("MMM D, YYYY")}</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <a
                  className=""
                  href="watchList"
                  >
                    <p className="text-base font-semibold">Watchlist</p>
                  </a>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <a
                  className=""
                  href="favourite-list"
                  >
                    <p className="text-base font-semibold">Favourite List</p>
                  </a>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <a
                  className=""
                  href="rating-list"
                  >
                    <p className="text-base font-semibold">Rating List</p>
                  </a>
                </div>
                <div className="bg-red-800 p-4 rounded-lg cursor-pointer" onClick={handleLogout}>
                  <p className="text-base font-semibold">Logout</p>
                </div>
            </div>
          </div>
        </div>
        )
};


export default ProfileCard;