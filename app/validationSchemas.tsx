import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3),
});
