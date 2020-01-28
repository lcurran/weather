const router = require('express').Router();
const User = require('./user');

// GET all
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create user
router.post('/', async (req, res) => {
  const user = new User({
    email: req.body.email,
    location: req.body.location
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// get one user
router.get('/:id', getUser, (req, res) => res.json(res.user));

// Update one user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.email !== null) {
    res.user.email = req.body.email;
  }

  if (req.body.location !== null) {
    res.user.location = req.body.location;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'user deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware to fetch specific user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cant find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
