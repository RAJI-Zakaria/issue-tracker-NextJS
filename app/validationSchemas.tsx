import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(65535),
});



export const patchIssueSchema = z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().min(3).max(65535).optional(),
    assignedToUserId: z.string().min(1, 'Assignee is required').max(255).optional().nullable(),
});
