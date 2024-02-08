import fastify from "fastify";
import cookie from "@fastify/cookie";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import websocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cookie, {
  secret: "polls-app-nlw", // for cookies signature
  hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}, // options for parsing cookies
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
