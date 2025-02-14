import { z } from "zod";

export const messageSchema = z
  .object({
    message_id: z.number().or(z.string()),
    from: z
      .object({
        id: z.number(),
        is_bot: z.boolean(),
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        username: z.string().optional(),
        language_code: z.string().optional(),
      })
      .passthrough(),
    chat: z
      .object({
        id: z.number(),
        first_name: z.string().optional(),
        username: z.string().optional(),
        type: z.string(),
      })
      .passthrough(),
    date: z.number(),
    text: z.string(),
  })
  .passthrough();

export const telegramUpdateSchema = z
  .object({
    ok: z.boolean(),
    result: z.array(
      z
        .object({
          update_id: z.number(),
          message: messageSchema,
        })
        .passthrough(),
    ),
  })
  .passthrough();

export const sendResponseSchema = z
.object({
  ok: z.boolean(),
  result: messageSchema,
})
.passthrough();
