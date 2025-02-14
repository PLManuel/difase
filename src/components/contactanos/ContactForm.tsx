import { useState, useEffect, useRef } from "react"

const ContactForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormDisabled, setIsFormDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    } else {
      setIsFormDisabled(false)
    }
  }, [timeLeft])

  useEffect(() => {
    if (formRef.current) {
      const elements = formRef.current.elements
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLButtonElement
        if (element.tagName !== "BUTTON" || element.type === "submit") {
          element.disabled = isFormDisabled || isSubmitting
        }
      }
    }
  }, [isFormDisabled, isSubmitting])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const { username, phone, email, asunto, comment } =
        Object.fromEntries(formData)

      try {
        await fetch("/api/sendContacto.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            phone,
            email,
            asunto,
            comment,
          }),
        })
        setError(null)

        setShowSuccessAlert(true)

        setTimeout(() => {
          setShowSuccessAlert(false)
        }, 3000)

        formRef.current.reset()

        setIsFormDisabled(true)
        setTimeLeft(60)
      } catch (e) {
        console.error(e)
        setError(
          "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo."
        )
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
      {showSuccessAlert && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          ¡El correo se envió correctamente!
        </div>
      )}

      <form ref={formRef} className="mt-5" onSubmit={handleSubmit}>
        {[
          {
            label: "Nombre",
            id: "username",
            type: "text",
            placeholder: "Luis Zabaleta Pacora",
          },
          {
            label: "Teléfono",
            id: "phone",
            type: "tel",
            placeholder: "936 036 026",
          },
          {
            label: "Correo",
            id: "email",
            type: "email",
            placeholder: "nombre@ejemplo.com",
          },
          { label: "Asunto", id: "asunto", type: "text", placeholder: "" },
        ].map(({ label, id, type, placeholder }) => (
          <fieldset className="flex flex-col gap-2 mb-4" key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              className="border border-blue-700 disabled:bg-slate-100 outline-offset-0 focus:outline-2 focus:outline-blue-400 px-2 py-1 transition-all duration-100 outline-0 outline-none rounded-sm min-h-10 resize-none max-h-40"
              type={type}
              id={id}
              name={id}
              placeholder={placeholder}
              required
            />
          </fieldset>
        ))}
        <fieldset className="flex flex-col gap-2 mb-4">
          <label htmlFor="comentario">Comentario</label>
          <textarea
            className="border border-blue-700 disabled:bg-slate-100 outline-offset-0 focus:outline-2 focus:outline-blue-400 px-2 py-1 transition-all duration-100 outline-0 outline-none rounded-sm min-h-20 resize-none max-h-40"
            id="comentario"
            name="comment"
            required
          ></textarea>
        </fieldset>
        <fieldset className="flex items-center">
          {error && (
            <span className="text-red-500 block font-bold">{error}</span>
          )}
          {isFormDisabled && (
            <span className="text-blue-800 block font-bold">
              Podrá volver a enviar un mensaje en {timeLeft} seg.
            </span>
          )}
          <button
            className="border cursor-pointer disabled:cursor-default block ml-auto py-2 px-4 text-white bg-blue-900 disabled:bg-blue-950"
            type="submit"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </fieldset>
      </form>
    </>
  )
}

export default ContactForm
