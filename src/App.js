import Routes from "./Routes/Routes";
import { useEffectOnce } from "./Helpers/useEffect";
import { getToken } from "./Features/auth/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffectOnce(() => {
    // dispatch(getToken());
  });
  return <Routes />;
}

export default App;
