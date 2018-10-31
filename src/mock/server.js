const jsonServer = require("json-server")
const server = jsonServer.create()
const { MOCK_PORT } = require("./config")

// Support middleware
const middleware = jsonServer.defaults()
server.use(middleware)

const path = require("path")
const router = jsonServer.router(path.join(__dirname, "db.json"))
server.use(
  jsonServer.rewriter({
    "/manager/*": "/$1"
  })
)
server.use(router)

// 返回自定义格式数据
router.render = (req, res) => {
  console.log(res.locals.data)
  res.jsonp({
    data: res.locals.data,
    resultCode: "1000",
    resultMsg: "success"
  })
}

server.listen(MOCK_PORT, () => {
  console.log("JSON Server is running")
})
