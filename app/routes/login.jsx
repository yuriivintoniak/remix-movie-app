import AuthForm from "../components/AuthForm/AuthForm";
import { links as authFormLinks} from "../components/AuthForm/AuthForm";

export default function Login() {
  return <AuthForm mode="login" />;
}

export const links = () => {
  return [...authFormLinks()];
};
