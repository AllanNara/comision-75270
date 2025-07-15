export const createUserTemplateMail = (user) => `
  <div>
  <h2>Bienvenido ${user.first_name} </h2>
  <p>Gracias por registrarte en la pagina </p>
</div>
`

const forgotPasswordTempalteMail = () => `
  <p>Clickea el siguiente link para registrar una nueva contraseña</p>
`
