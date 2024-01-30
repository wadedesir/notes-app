import User from '../models/User.js'

export const createNewUser = async (req, res, next) => {
  const body = req.body

  const user = new User({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    next(error)
  }
}

export const findUserById = async (req, res, next) => {
  try {
    const id = req.params["id"];
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      res.json({ message: `404 user with id:${id} not found` });
    } else {
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
}

export const updateUser = async (req, res, next) => {
  const body = req.body
  console.log(JSON.stringify(req.body))

  const userEdit = {
    content: body.content,
    important: body.important,
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, userEdit, { new: true })
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.json(deletedUser)
  } catch (error) {
    next(error)
  }
}
