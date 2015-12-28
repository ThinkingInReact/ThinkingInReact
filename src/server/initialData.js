function initialData(req, res) {
  let user;

  if(req.user) {
    user = {
      isLoggedIn: true,
      email: req.user.email,
      name: req.user.name,
      githubUser: req.user.githubUser,
      boughtPackageId: req.user.boughtPackageId
    };
  } else {
    user = {
      isLoggedIn: false
    };
  }

  return {
    user
  };
}

export default initialData;
