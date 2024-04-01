const { validationResult, body } = require('express-validator');

exports.userSigninValidator = [
          
  body('email').trim()
               .notEmpty().withMessage('Le champ email est obligatoire')
               .isEmail().withMessage('Veuillez fournir une adresse email valide'),

  body('password').trim()
                  .notEmpty().withMessage('Le champ password est obligatoire')
                  .isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères'),




  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];
