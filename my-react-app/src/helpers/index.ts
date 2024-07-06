const validateToken = (token:string) => {
    const payload = token.split(".")[1];
    if (payload) {
      try {
        const unHashedToken = JSON.parse(atob(payload))
        const exp = unHashedToken.exp;
        localStorage.setItem("role", unHashedToken.role)
        const now = new Date().getTime() / 1000;
        if (exp > now) {
          return true;
        }
        localStorage.removeItem("token");
        return false;
      } catch (error) {
        localStorage.removeItem("token");
        return false;
      }
    } else {
      localStorage.removeItem("token");
      return false;
    }
  };
  
  export { validateToken };