import { createServer } from "miragejs"

export function makeServer() {
  createServer({
    routes() {
      this.namespace = "api"

      this.get("/users", () => {
        const users = []
        for (let i = 1; i <= 50; i++) {
          const imageNumber = ((i - 1) % 3) + 1 
          users.push({
            id: i,
            name: "This is a title",
            username: "by username",
            imageUrl: `/images/image${imageNumber}.png`
          })
        }
        return users
      })
    }
  })
}
