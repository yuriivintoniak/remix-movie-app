import SignupForm from "../components/SignupForm/SignupForm";
import { links as signupFormLinks} from "../components/SignupForm/SignupForm";

export default function Signup() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}

export const links = () => {
  return [ ...signupFormLinks() ];
};
