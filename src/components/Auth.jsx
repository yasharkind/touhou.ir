import { useContext } from "react";
import { createContext } from "react";

const backenduser = "https://chat.touhou.ir:3000/user";

const UserContext = createContext({username: ""});

/*export default ({children}) => {
    const [userData, setUserData] = useState(null);

    return(
        <UserContext.Provider value={ {userData,setUserData} }>
            {children}
        </UserContext.Provider>
    )
} */

class ContextSingleton {

	static _instance = null

	username = null

	getUsername = () => {
		return this.username
	}

	_user(token) {
	// loggedInUser
    fetch(backenduser, {
      headers: { Authorization: token },
    }).then((r) => {
      r.json().then((rr) => {
		  this.username = rr.username
      });
    });
	}

	constructor(token) {
		this._user(token)
	}

	static getInstance(token) {
		if (this._instance)
			return this._instance
		this._instance = new ContextSingleton(token)
		return this._instance
	}
}

export default ContextSingleton

export const useUser = () => {
    return useContext(UserContext);
}
