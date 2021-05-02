import { Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function LogoutPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    useEffect(() => {
        removeCookie("jwt");
    }, [])

    return (
        <Redirect push to={"/"} />
    );
}

export default LogoutPage;