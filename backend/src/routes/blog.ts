import {Hono} from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { CreateBlogSchema, UpdateBlogSchema  } from "@frinsgupta/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_KEY: string;
    };
    Variables: {
      userId: number;
    };
  }>();

  blogRouter.use("/*", async (c, next) => {
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


  blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    const {success} = CreateBlogSchema.safeParse(body)
  
    if (!success) {
      return c.json({msg: "Input are not correct"})
    }
  
    const userId = c.get("userId");
  
    try {
      const response = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: userId,
        },
      });
      return c.json({ msg: "New post added", response });
    } catch (error) {
      console.log(error);
      return c.json({ error });
    }
  });
  
  blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    const {success} = UpdateBlogSchema.safeParse(body)
  
    if (!success) {
      return c.json({msg: "Input are not correct"})
    }
  
    const id = body.id;
  
    try {
      const response = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      });
      return c.json({ msg: "Updating successful", response });
    } catch (error) {
      console.log(error);
      return c.json({ error });
    }
  });
  
  blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const response = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      return c.json({ msg: "All blog route", response });
    } catch (error) {
      console.log(error);
      return c.json({ error });
    }
  });
  
  blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const id = parseInt(c.req.param("id"));
      console.log(id);
      const response = await prisma.post.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      return c.json({ msg: "Filtered blog", response });
    } catch (error) {
      console.log(error);
      return c.json({ error });
    }
  });
  
  
  