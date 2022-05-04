function Authenticate(data, callback) {
  if (!data.data.token) localStorage.clear();
  localStorage.setItem("is_login", JSON.stringify(true));
  localStorage.setItem(
    "is_authenticated",
    JSON.stringify(data.success || data.sucess)
  );
  console.log(data);
  callback();
}

const isAuthenticated = () => {
  let is_login = JSON.parse(localStorage.getItem("is_login"));
  let is_authenticated = JSON.parse(localStorage.getItem("is_authenticated"));
  let is_otp_verified = JSON.parse(localStorage.getItem("is_otp_verified"));
  console.log(is_authenticated, is_login, is_otp_verified);
  if (is_authenticated && is_login && is_otp_verified) {
    return true;
  } else {
    return false;
  }
};

export { Authenticate, isAuthenticated };
