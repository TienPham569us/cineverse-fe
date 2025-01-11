import { Profile } from "@/types/profile/profile.response";
import dayjs from "dayjs";
import Img from "../Img";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import PosterFallback from "@/assets/no-poster.png";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/actions/authActions";
import { AppDispatch } from "@/lib/redux/store";

const ProfileCard = ({ profile }: { profile: Profile}) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        window.location.href = '/login';
        dispatch(logout());
        
      };

    return (<>
        <Card>
            <CardHeader className="flex flex-row justify-center items-center">
                <CardTitle>
                <div className="profileImgWrapper">
                    {profile.profilePath ? (
                    <Img
                        className="profileImg"
                        src={profile.profilePath}
                    />
                    ) : (
                    <Img className="profileImg" src={PosterFallback.src} />
                    )}
                </div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div>
                <div>
                    <span className="font-bold me-2">
                    Username: 
                    </span>
                    <span className="">
                        {profile.name}
                    </span>
                </div>

                <div>
                    <span className="font-bold me-2">
                    Email: 
                    </span>
                    <span className="">
                        {profile.email}
                    </span>
                </div>

                <div>
                    <p >
                    Member since:
                        <span className="italic text-slate-700">
                        {dayjs(profile.createdAt).format("MMM D, YYYY")}
                        </span>
                    </p>
                </div>
                </div>
                
            </CardContent>

            <CardFooter>
                <Button
                onClick={handleLogout}
                variant="outline"
                className="logoutButton">
                Logout
                </Button>
            </CardFooter>

        </Card>
    </>)
};


export default ProfileCard;