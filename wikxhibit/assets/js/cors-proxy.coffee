host = (if process.env.PORT then "0.0.0.0" else "127.0.0.1")
port = process.env.PORT or process.argv[2] or 8080
cors_proxy = require("cors-anywhere")

cors_proxy.createServer({}).listen port, host, ->
  console.log "Running CORS Anywhere on " + host + ":" + port
  return