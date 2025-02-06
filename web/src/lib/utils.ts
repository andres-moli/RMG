
import { GraphQLError } from "graphql";
import { toast } from "sonner";

/**
 * Raises an error alert for graph fetchs
 * @param request
 * @returns
 */
type IToastyErrorGraph = { [key: string]: any }; // GraphQLError | { "response": { "errors": GraphQLError } }
export const ToastyErrorGraph = (request: IToastyErrorGraph) => {
  if (request.response && request.response.errors) {
    const error: GraphQLError[] = request.response.errors;
    const message = error.map(({ message }) => `${message}`)[0];
    // ToastyAlert.fire(message.replace('👮‍♂', ''), undefined, "error")
    toast.error(message);
    return true;
  }
  if (request.message as GraphQLError) {
    // ToastyAlert.fire(request.message.replace('👮‍♂', ''), undefined, "error")
    toast.error(request.message);
    return true;
  }
  return false;
};