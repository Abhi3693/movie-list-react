export default function validate(errors, name, value) {
  switch (name) {
    case 'email':
      let emailError = '';
      if (value.indexOf('@') === -1) {
        emailError = 'Enter valid Email';
      }
      if (!value) {
        emailError = 'Email cant be empty';
      }
      return {...errors, email: emailError}
    case 'name':
      let nameError = '';
      if (value.length < 3) {
        nameError = 'Name should contain 3 charachter';
      }
      if (!value) {
        nameError = "Name can't be empty";
      }
      return {...errors, name: nameError}
    case 'password':
      let passwordError = '';
      var numeric_alpha = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

      if (!value) {
        passwordError = "Password can't be empty";
      } else if (!numeric_alpha.test(value)) {
        passwordError = 'Password should contain one alphabet and one number';
      } else if (value.length < 3) {
        passwordError = 'Password should contain atleast 3 character';
      }
      return {...errors, password: passwordError}
    default:
      return errors;
  }
}