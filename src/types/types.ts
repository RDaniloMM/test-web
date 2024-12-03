// types.ts
import { Prisma } from "@prisma/client";

export type UserWithFollowers = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        followers: true;
        followings: true;
        posts: true;
      };
    };
  };
}>;

export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    user: true;
    likes: {
      select: {
        userId: true;
      };
    };
    _count: {
      select: {
        comments: true;
      };
    };
  };
}>;