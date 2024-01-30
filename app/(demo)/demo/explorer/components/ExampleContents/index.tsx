export interface IExampleContentsProps {
  componentId: string;
}

export function ExampleContents(props: IExampleContentsProps) {
  return (
    <div>
      <h1>Example Contents</h1>
      <h2>for : {props.componentId}</h2>
    </div>
  );
}
