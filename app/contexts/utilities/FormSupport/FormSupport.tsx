import { ReactNode, useEffect, useState } from "react";
import {
  FormSupportProvider,
  IFSContextInitializer,
  useFormSupportContext,
} from "./FormSupportContext";

// First we need to add a type to let us extend the incoming component.

// Mark the function as a generic using P (or whatever variable you want)
function withFSContextInitializer<P>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts AND our extraInfo prop
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithExtraInfo = (props: P & IFSContextInitializer) => {
    const { initializeContext } = useFormSupportContext();
    const {
      defaultForm,
      formConfiguration,
      dataSourceProvider,
      dataSourceReducer,
    } = props;
    // At this point, the props being passed in are the original props the component expects.
    useEffect(() => {
      initializeContext(
        defaultForm,
        formConfiguration,
        dataSourceProvider,
        dataSourceReducer
      );
    }, []);
    return <WrappedComponent {...props} />;
  };
  return ComponentWithExtraInfo;
}

export function withFSContextFormSupport<P>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts AND our extraInfo prop
  WrappedComponent: React.ComponentType<P>
) {
  const AddInititializer = withFSContextInitializer(WrappedComponent);
  const FSContextWrapper = (props: P & IFSContextInitializer) => {
    return (
      <FormSupportProvider>
        <AddInititializer {...props} />
      </FormSupportProvider>
    );
  };
  return FSContextWrapper;
}

