import { Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign,verify, decode } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_KEY: string;
  },
  Variables: {
    userId: number
  }
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const token = c.req.header("Authorization") || "";

  try {
    const decoded = await verify(token.split(" ")[1],c.env.JWT_KEY)
  if (decoded) {
    //@ts-ignore
    c.set("userId",decoded.id)
    await next();
  }
  else{
    return c.json({msg: "User not authorized"})
  }
  } catch (error) {
    console.log(error);
    return c.json({error});
  }
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const userExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (userExist) {
      return c.json({ msg: "User already exist" });
    }
    const response = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    const token = await sign({ id: response.id }, c.env.JWT_KEY);
    return c.json({ msg: " Successfully Signed Up ", token });
  } catch (error) {
    console.log(error);
    return c.json({error})
  }
});

app.post("api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.json({ msg: "User doesnt exist" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_KEY);
    return c.json({ msg: "Signed In successfully ", token });
  } catch (error) {
    console.log(error);
    return c.json({error})
  }
});

app.post("api/v1/blog", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const userId = c.get("userId")

  try {
    const response = await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId:userId
      },
    })
    return c.json({msg:"New post added",response});
  } catch (error) {
    console.log(error); 
    return c.json({error})
  }
});

app.put("api/v1/blog",async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const id = body.id;

  try {
    const response = await prisma.post.update({
      where: {
         id: id
      },
      data:{
          title:body.title,
          content:body.content
      }
    })
    return c.json({msg:"Updating successful",response});
  } catch (error) {
    console.log(error);
    return c.json({error})
  }
});

app.get("/api/v1/blog/bulk",async (c) => {
const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

try {
  const response = await prisma.post.findMany({})
  return c.json({msg:"All blog route",response});
} catch (error) {
  console.log(error);
  return c.json({error})
}
});

app.get("api/v1/blog/:id",async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {    
    const id =  parseInt(c.req.param('id'))
    console.log(id);
    const response =await prisma.post.findUnique({
      where:{
        id:id
      }
    })
    return c.json({msg:"Filtered blog",response});
  } catch (error) {
    console.log(error);
    return c.json({error})
  }
});

export default app;
