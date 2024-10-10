import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  DefaultValues,
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps,
} from "react-hook-form";
import { z } from "zod";

const useFormAction = <
  T extends FieldValues,
  U extends Record<string, unknown>,
>({
  defaultValues,
  schema,
  action,
  mode,
}: {
  defaultValues: DefaultValues<T>;
  schema: z.Schema;
  action: (_: T) => Promise<U>;
  mode?: UseFormProps<T>["mode"];
}) => {
  const form = useReactHookForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
    mode,
  });

  const [response, setResponse] = useState<U | null>(null);

  const [pending, startTransition] = useTransition();

  const onSubmit = async (data: T) => {
    startTransition(async () => {
      setResponse(await action(data));
    });
  };

  const resetResponse = () => {
    setResponse(null);
  };

  return {
    form,
    pending,
    resetResponse,
    onSubmit,
    response,
  };
};

export { useFormAction };
