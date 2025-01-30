import { actions } from "astro:actions"
import { navigate } from "astro:transitions/client"

document.addEventListener("astro:page-load", () => {
  const contactForm = document.querySelector("#contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault()
      const formData = new FormData(contactForm)
      const { error } = await actions.send(formData)
      if (!error) {
        navigate("/contactanos")
      } else {
        console.log(error)
      }
    })
  }
})
