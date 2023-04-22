import express from "express"
import "express-async-errors"
import timeout from "connect-timeout"
import morgan from "morgan"
import { User, dbConnect } from "./db"

const app = express()
const port = parseInt(process.env["PORT"] || "3000")

dbConnect(process.env["MONGO_URL"] || "mongodb://127.0.0.1:27017/users")

app.use(timeout("5s"))
app.use(express.json())
app.use(morgan("combined"))

app.get("/", async (_req, res) => {
  const users = await User.find()

  res.send(users)
  return res.status(200).end()
})

app.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) return res.status(404).end()

  res.send(user)
  return res.status(200).end()
})

app.post("/", async (req, res) => {
  const createdUser = new User(req.body)
  await createdUser.save()

  res.json(createdUser)
  return res.status(201).end()
})

app.put("/:id", async (req, res) => {
  const { id } = req.params
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)

  res.json(updatedUser)
  return res.status(200).end()
})

app.delete("/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id)
  return deletedUser ? res.status(204).end() : res.status(404).end()
})

app.use(function (err, _req, res, _next) {
  if (!err.statusCode) err.statusCode = 500

  res.status(err.statusCode).json({
    status: false,
    error: err.message,
  })
} as express.ErrorRequestHandler)

app.use(function (req, res, _next) {
  res.status(404)
  res.send("invalid path")
} as express.RequestHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
