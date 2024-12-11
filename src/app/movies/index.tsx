import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MoviesHome = () => {
    const router = useRouter();
    useEffect(() => {
        if (router.query.id) {
            console.log(router.query.id);
            alert(router.query.id);
            router.push(`/movies/${router.query.id}`);
        } else {
            router.push('/');
        }
    }, [router.query.id]);

    return <>Redirecting...</>;
};

export default MoviesHome;