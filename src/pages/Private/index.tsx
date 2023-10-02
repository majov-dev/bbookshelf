import { useContext } from "react";
import Access from "../Access/Access";
import { AuthContext } from "../../context/Auth";
import Logged from "../../layouts/Logged";

const Private = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <Logged /> : <Access />;
};

export default Private;
