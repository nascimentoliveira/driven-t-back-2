import { ApplicationError } from "@/protocols";

export function queryParamRequired(paramName: string): ApplicationError {
  return {
    name: "QueryParamRequired",
    message: `Query Parameter ${paramName} is required!`,
  };
}
