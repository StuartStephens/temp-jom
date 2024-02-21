import { useEffect } from "react";
import { useAuth } from "../../contexts/Auth/Context";

export interface ILoginRequiredProps {}

export function LoginRequired(props: ILoginRequiredProps) {
  const { setIsLoginModalVisible } = useAuth();

  useEffect(() => {
    setIsLoginModalVisible(true);
  }, []);
  return <div>You must be logged in to see this page</div>;
}
