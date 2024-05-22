import {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  FC,
} from "react";

interface AuthContextType {
  clientToken: string | null;
  setClientToken: (token: any) => void;
  userToken: string | null;
  setUserToken: (token: string | null) => void;
  fetchClientToken: () => Promise<void>;
  fetchUserToken: (code: string) => Promise<void>;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const fetchClientToken = useCallback(async () => {
    const CLIENT_ID = "***REMOVED***";
    const CLIENT_SECRET = "***REMOVED***";

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      });

      const data = await response.json();
      if (response.ok) {
        setClientToken(data.access_token);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching Spotify client token:", error);
    }
  }, []);

  const fetchUserToken = useCallback(async (code: string) => {
    const CLIENT_ID = "***REMOVED***";
    const CLIENT_SECRET = "***REMOVED***";
    const REDIRECT_URI = "http://localhost:5173/callback";

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
      });

      const data = await response.json();
      if (response.ok) {
        setUserToken(data.access_token);
        setLoggedIn(true);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching Spotify user token:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        clientToken,
        setClientToken,
        userToken,
        setUserToken,
        fetchClientToken,
        fetchUserToken,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
