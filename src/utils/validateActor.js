export default function validateActor(errors, name, value) {
  switch (name) {
    case 'dob':
      let DOBError = '';
      if (!value) {
        DOBError = "Date of birth can't be empty";
      }
      return {...errors, dob: DOBError}
    case 'name':
      let nameError = '';
      if (value.length < 3) {
        nameError = 'Name should contain 3 charachter';
      }
      if (!value) {
        nameError = "Name can't be empty";
      }
      return {...errors, name: nameError}
    case 'bio':
      let BIOError = '';
      if (!value) {
        BIOError = "Password can't be empty";
      } else if (value.length < 3) {
        BIOError = 'Bio should contain atleast 5 character';
      }
      return {...errors, bio: BIOError}
    default:
      return errors;
  }
}