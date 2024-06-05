import { createContext, useContext } from "react";

export interface JwtPayload {
    userId: string;
    name: string;
    exp: number;
  }

  interface JwtPayloadContextProps {
    decoded: JwtPayload | null;
    setDecoded: React.Dispatch<React.SetStateAction<JwtPayload | null>>;
  }
  
  const JwtPayloadContext = createContext<JwtPayloadContextProps | null>(null);
  
  export const useJwtPayload = () => useContext(JwtPayloadContext);
  
  export default JwtPayloadContext;