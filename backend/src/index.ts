import { Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
// import { env } from 'hono/adapter'

// const app = new Hono();

// app.get("/",(c)=>{
//   return c.text("Hi there")
// })

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.post("/api/v1/user/signup", async (c) => {
// app.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  
  try {
    const body = await c.req.json();
    const response = await prisma.user.create({
      data: {
        
        email: body.email,
        name: body.name,
        password: body.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    console.log(response);
    
  return c.text("Sign Up page"+ response);
    
  } catch (error) {
    console.log(error);
    
  }
  // return c.text("Signup page")
});

// app.post("api/v1/user/signin", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   return c.text("Sign in page");
// });

// app.get("/api/v1/blog/bulk", (c) => {
app.get("/", (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate());
  return c.text("All blog route");
});

// app.get("api/v1/blog/:id", (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   return c.text("Filtered blog");
// });

// app.post("api/v1/blog", (c) => {
//   return c.text("Blog uploadig route page");
// });

// app.put("api/v1/blog", (c) => {
//   return c.text("Blog updating route");
// });

// app.post('/', async (c) => {
//   // Todo: add Zod validation here
//   const body = await c.req.json()
//   const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

//   const prisma = new PrismaClient({
//       datasourceUrl: DATABASE_URL,
//   }).$extends(withAccelerate())

//   console.log(body)

//   await prisma.user.create({
//     data: {
//       name: body.name,
//       email: body.email,
//       password: body.password
//     }
//   })

//   return c.json({msg: "User created"})
// })

export default app
