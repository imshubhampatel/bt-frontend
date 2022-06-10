import Routes from "./Routes/Routes";
import { useEffectOnce } from "./Helpers/useEffect";
import { getToken } from "./Features/auth/authSlice";
import { useDispatch } from "react-redux";

const App = () => {
  return <Routes />;
};

export default App;
