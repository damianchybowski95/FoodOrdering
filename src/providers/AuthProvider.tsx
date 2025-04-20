import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: string | null;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false
});

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSessions = async () => {
      console.log("fetching session...");
      const results = await supabase.auth.getSession();
      setSession(results.data.session);    
      if (results.data.session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("group")
          .eq("id", results.data.session.user.id)
          .single();
        console.log("sql data: ", data?.group);
        setProfile(data?.group || null);
        // Loading powinno być wyłączane na końcu operacji.
        setLoading(false);
      }
    };
    fetchSessions();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session: session, loading: loading, profile: profile, isAdmin : profile === "ADMIN" ? true : false }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
