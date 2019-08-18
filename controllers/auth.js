const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/models');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await db.users.findOne({ where: { email } });
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          return jwt.sign({
            data: {
              email,
              id: user.id,
              name: user.name,
            },
          }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) return res.status(500).json({ message: 'E_TOKEN' });
            return res.json({ token });
          });
        }
      } catch(e) {
        return res.status(500).send({ message: 'E_CREDENTIAL' });
      }
    }
    return res.status(500).json({ message: 'E_CREDENTIAL' });
  }
}