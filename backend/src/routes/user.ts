import {Hono} from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { SignInSchema, SignUpSchema } from "@frinsgupta/medium-common";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_KEY: string;
    };
    Variables: {
      userId: number;
    };
  }>();

  userRouter.use("/", async (c, next) => {
    const token = c.req.header("Authorization") || "";
  
    try {
      const decoded = await verify(token.split(" ")[1], c.env.JWT_KEY);
      if (decoded) {
        //@ts-ignore
        c.set("userId", decoded.id);
        await next();
      } else {
        return c.json({ msg: "User not authorized" });
      }
    } catch (error) {
      console.log(error);
      return c.json({ error });
    }
  });

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
  
      const body = await c.req.json();
      const {success} = SignUpSchema.safeParse(body)
  
      if (!success) {
        return c.json({msg: "Inputs are not Correct"})
      }
  
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
      return c.json({ error });
    }
  });
  
  userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    const {success} = SignInSchema.safeParse(body)
  
    if (!success) {
      return c.json({msg: "Input are not correct"})
    }
  
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
      return c.json({ error });
    }
  });


  userRouter.get("/", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const id = c.get("userId");
    const response = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  
    return c.json({ response });
  });