export const validateUser = (req, res, next) => {
  const { nom, email, password, roleId } = req.body;

  if (!nom || !email || !password || !roleId) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  if (nom.trim() === "") {
    return res.status(400).json({ message: "Le nom est obligatoire" });
  }

  if (email.trim() === "") {
    return res.status(400).json({ message: "L'email est obligatoire" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email invalide" });
  }

  if (password.trim() === "") {
    return res.status(400).json({ message: "Le mot de passe est obligatoire" });
  }

  if (isNaN(roleId)) {
    return res.status(400).json({ message: "roleId doit etre un nombre" });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe obligatoires" });
  }

  if (email.trim() === "") {
    return res.status(400).json({ message: "L'email est obligatoire" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email invalide" });
  }

  if (password.trim() === "") {
    return res.status(400).json({ message: "Le mot de passe est obligatoire" });
  }

  next();
};