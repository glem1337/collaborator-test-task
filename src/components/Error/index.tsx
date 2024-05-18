interface IProps {
  message: string;
};

function Error({ message }: IProps) {
  return <div className="error">{message}</div>;
}

export default Error;
