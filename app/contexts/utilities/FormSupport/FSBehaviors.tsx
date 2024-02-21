import { ReactNode } from "react";
import { FormField } from "./FormSupportTypes";

//LIFECYCLE
// 1) set the field configuration
// 1a) validation configuration
// 2) fetch data (optional) or provide data from datasource ( could be a method that returns the object )
// 3) reduce data into form to match the configuration settings
// 4) render the form
// 5)

export interface IFSFormConfiguration {
  postFormEndpoint?: string;
  validateFormEndpoint?: string | undefined;
  formFields: Map<string, FormField>;
}

export type DSProvider = () => Promise<any>;
export type DSReducer = (data: any) => any;

export type FormSubmitProvider = () => Promise<Response>;
export type FormSubmitSuccessProvider = (data: any) => void;

export interface IFSBehaviorsProps {
  children: ReactNode;
  defaultForm: any;

  dataSourceProvider?: () => Promise<any>; //if you need to fetch data to load into the form - can be in any format, as you can use the dataSourceReducer to convert it to your form specs
  dataSourceReducer?: (data: any) => any; //this should reduce the data source to form properties which match the field definitions
  formConfiguration: IFSFormConfiguration; //contains the endpoint configurations and the field definitions ( names, labels, validation, etc. )
  formSubmitProvider: FormSubmitProvider;
  formSubmitSuccessProvider?: (data: any) => void; // if the form saves successfully, what do you want to do with the data (refesh the UI, etc)
  // formSubmissionProvider: () => Promise<any>;
  //   initializeForm: Function;
  //   fieldConfiguration: any;
  //   onBeforeSubmit: Function;
  //   onSubmit: Function;
  //   onSubmitSuccess: Function;
  //   onSubmitFailure: Function;
}

export function FSBehaviors(props: IFSBehaviorsProps) {
  const {
    children,
    defaultForm,
    dataSourceProvider,
    dataSourceReducer,
    formConfiguration,
    formSubmitSuccessProvider,
    formSubmitProvider,
  } = props;

  return (
    <>
      {/* {state?.formConfiguration?.formFields &&
        JSON.stringify(
          JSON.stringify(
            Object.fromEntries(state.formConfiguration.formFields.entries())
          )
        )} */}
      {/* {state ? JSON.stringify(state) : "NO FORM "} */}
      {/* {children && state ? (
        <div>
          {isInitialized ? (
            <div>
             
              {children}
            </div>
          ) : (
            <div>...loading</div>
          )}
        </div>
      ) : (
        <div>No children provided</div>
      )} */}
    </>
  );
}
