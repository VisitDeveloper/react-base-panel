import { useEffect, useState } from "react";
import { SchemaOf } from "yup";

export const useYup = <T,>(schema: SchemaOf<T>, data?: T) => {
  const [isValid, setIsValid] = useState<boolean>();

  const hasError = (key: string): string | undefined => {
    try {
      schema.validateSyncAt(key, data);
      return;
    } catch (error: any) {
      return error.message;
    }
  };

  useEffect(() => {
    schema.isValid(data).then((result) => setIsValid(result));
  }, [data, schema]);

  return { isValid, hasError };
};
