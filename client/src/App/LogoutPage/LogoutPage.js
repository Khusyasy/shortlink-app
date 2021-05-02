import { Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';

function LogoutPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    removeCookie("jwt");

    return (
        <Redirect push to={"/"} />
    );
}

export default LogoutPage;