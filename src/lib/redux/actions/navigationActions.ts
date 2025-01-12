import * as dotenv from 'dotenv';
import { ApiManager } from "@/api_manager/ApiManager";
import { ENDPOINTS } from "@/api_manager/EndPoints";
import { NavigationResponse } from '@/types/navigation/navigation.response';
import { toast, ToastOptions } from 'react-toastify';
import { CAST_PAGE, GENRE_PAGE, HOME_PAGE, MOVIE_PAGE, NONE, PROFILE_PAGE, SEARCH_PAGE } from '../constants/navigationConstants';

dotenv.config();

const headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
};

const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
};

const API_BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://cineverse-be-ga2.onrender.com'; //'http://localhost:8080'; // process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.themoviedb.org/3';

export const fetchAINavigation = async (query: string): Promise<NavigationResponse | null> => {
    try {
        const response = await ApiManager.get(
           `${ENDPOINTS.AI_NAVIGATION}?query=${query}`,
            headers,
            undefined,
            API_BASE_URL
        );

        console.log("response", response);

        return response;
    } catch (error: any) {
        console.error("Error fetching ai navigation:", error);
        return null;
    }

}

export const handleAINavigation = (response: NavigationResponse ): void => {
    if (response) {
        const { route, params } = response;
        console.log("route", route);
        console.log("params", params);

        switch (route) {
            case MOVIE_PAGE:
                if (params.movies.length >= 1) {
                    // Redirect to movie page
                    window.location.href = `/movies/${params.movies[0].id}`;
                } else {
                    toast.error('No movies found', toastOptions);
                }
                break;
        
            case CAST_PAGE:
                if (params.movies.length >= 1) {
                    // Redirect to cast in movie page
                    window.location.href = `/movies/${params.movies[0].id}#cast`;
                } else {
                    toast.error('No casts found', toastOptions);
                }
                break;
        
            case GENRE_PAGE:
                if (params.movies.length >= 1) {
                    // Redirect to movie page that has that genre
                    // TODO: replace with search with filter by genre
                    window.location.href = `/movies/${params.movies[0].id}`;
                } else {
                    toast.error('No genres found', toastOptions);
                }
                break;
        
            case SEARCH_PAGE:
                if (params.keyword) {
                    // Redirect to search page
                    window.location.href = `/search?query=${params.keyword}&page=1`;
                } else {
                    toast.error('No search found', toastOptions);
                }
                break;
        
            case HOME_PAGE:
                // Redirect to home page
                window.location.href = `/`;
                break;
        
            case PROFILE_PAGE:
                // Redirect to profile page
                window.location.href = `/profile`;
                break;
        
            case NONE:
                toast.error('No route found', toastOptions);
                break;
        
            default:
                toast.error('No route found', toastOptions);
                break;
        }
    }
}
