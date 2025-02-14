import type { APIRoute } from "astro"
import { render } from "@react-email/render"
import CotizacionEmail from "@/components/emails/CotizacionEmail"
import { Resend } from "resend"

export const prerender = false

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  try {
    const dataForm = await request.json()
    const { username, phone, email, asunto, comment } = dataForm

    const html = await render(
      CotizacionEmail({
        asunto: asunto,
        comentario: comment,
        correo: email,
        nombre: username,
        telefono: phone,
      }),
      {
        pretty: true,
      }
    )

    const text = await render(
      CotizacionEmail({
        asunto: asunto,
        comentario: comment,
        correo: email,
        nombre: username,
        telefono: phone,
      }),
      {
        plainText: true,
      }
    )

    const { data, error } = await resend.emails.send({
      from: `${username} <onboarding@resend.dev>`,
      to: ["manuelcomp.715@gmail.com"],
      subject: asunto,
      html,
      text,
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: "Error al enviar el correo" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
