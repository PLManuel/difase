import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface SampleEmailProps {
  nombre: string
  asunto?: string
  comentario: string
  telefono: string
  correo: string
}

const baseUrl = import.meta.env.SITE

export default function SampleEmail({
  asunto = "Requiero mas informacion sobre sus servicios",
  comentario,
  nombre,
  telefono,
  correo,
}: SampleEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{asunto}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={imageSection}>
            <Img
              src={`${baseUrl}/imagotipo.svg`}
              width="80"
              height="80"
              alt="Logo de Difase Machinery SAC"
            />
          </Section>
          <Section style={upperSection}>
            <Heading style={h1}>{asunto}</Heading>
            <Text style={mainText}>{comentario}</Text>
          </Section>
          <Hr />
          <Section style={{ ...lowerSection, textAlign: "center" }}>
            <Text style={paragraph}>
              <b style={{ marginRight: 20 }}>Nombre: </b>
              {nombre}
            </Text>
            <Text style={{ ...paragraph, marginTop: -5 }}>
              <b style={{ marginRight: 20 }}>Telefono: </b>
              {telefono}
            </Text>
            <Text style={{ ...paragraph, marginTop: -5 }}>
              <b style={{ marginRight: 20 }}>Correo </b>
              {correo}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
}

const container = {
  padding: "20px",
  margin: "0 auto",
}

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
}

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
}

const imageSection = {
  display: "flex",
  padding: "20px 0",
  justifyContent: "center",
}

const upperSection = { padding: "25px 35px" }

const lowerSection = { padding: "25px 35px" }

const mainText = { ...text, marginBottom: "14px" }

const paragraph = {
  fontSize: 16,
}
