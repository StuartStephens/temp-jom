export interface IPropertiesPanelProps {
  componentId: string;
}

export function PropertiesPanel(props: IPropertiesPanelProps) {
  return (
    <div className="bg-warning">
      <h1>Properties Panel</h1>
      <h2>for : {props.componentId}</h2>
    </div>
  );
}
