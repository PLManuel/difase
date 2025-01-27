import { RESEND_API_KEY } from "astro:env/server"
import { defineAction } from "astro:actions"
import { render } from "@react-email/render"
import { Resend } from "resend"
import { z } from "astro:schema"

import SampleEmail from "@/components/contactanos/SampleEmail"

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      username: z.string(),
      email: z.string().email(),
      phone: z.string(),
      sector: z.string(),
      comment: z.string(),
    }),
    handler: async ({ username, email, phone, sector, comment }) => {
      try {
        const resend = new Resend(RESEND_API_KEY)
        const emailContent = SampleEmail({
          asunto: `Solicitud de informacion del sector ${sector}`,
          nombre: username,
          correo: email,
          telefono: phone,
          comentario: comment,
        })

        const html = await render(emailContent)
        const text = await render(emailContent, { plainText: true })

        const { data, error } = await resend.emails.send({
          from: `${username} <onboarding@resend.dev>`,
          to: ["manuelcomp.715@gmail.com"],
          subject: `Solicitud de informacion del sector ${sector}`,
          html,
          text,
        })

        if (error) {
          console.error("Error enviando el correo:", error)
          throw new Error("Error enviando el correo")
        }
        return data
      } catch (err) {
        console.error("Error en el handler:", err)
        throw err
      }
    },
  }),
}
