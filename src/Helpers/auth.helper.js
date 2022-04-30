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

export { Authenticate };
