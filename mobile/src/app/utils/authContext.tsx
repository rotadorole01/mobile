import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AuthContextProps = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setILoggedIn] = useState(false);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        // 1. Pega a string do AsyncStorage
        const jsonValue = await AsyncStorage.getItem("my-key");

        // 2. Verifica se ela existe e transforma em objeto
        if (jsonValue !== null) {
          const resultado = JSON.parse(jsonValue);
          console.log(typeof resultado.isLoggedIn);
          // 3. Atualiza o seu estado com o valor booleano (true/false)
          if (resultado.isLoggedIn) {
            console.log(`if  ${resultado.isLoggedIn}`);
            setILoggedIn(true);
          } else {
            setILoggedIn(false);
          }
        }
      } catch (error) {
        console.error("Erro ao ler o status de login:", error);
      } finally {
        setILoggedIn(false); // Finaliza o estado de carregamento
      }
    };

    verificarLogin();
  }, []);

  const logIn = async () => {
    const jsonValue = JSON.stringify({ isLoggedIn: true });
    setILoggedIn(true);
    await AsyncStorage.setItem("my-key", jsonValue);
  };

  const logOut = async () => {
    const jsonValue = JSON.stringify({ isLoggedIn: false });
    setILoggedIn(false);
    await AsyncStorage.setItem("my-key", jsonValue);
  };

  return (
    <AuthContext value={{ isLoggedIn, logIn, logOut }}>{children}</AuthContext>
  );
}
