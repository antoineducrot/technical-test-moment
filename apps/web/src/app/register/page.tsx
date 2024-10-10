"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";

import { H1, H4, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormAction } from "@/lib/form/use-form-action.hook";

import { registerAction } from "./_actions/register.action";
import { registerSchema } from "./_actions/register.form-schema";

const Page = () => {
  const { form, onSubmit, pending, response } = useFormAction({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    schema: registerSchema,
    action: registerAction,
    mode: "onSubmit",
  });

  const isError = response?.error;

  const message = response?.message;

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <H1>Create an account</H1>
        <H4>Enter your information to log in.</H4>
        <P>
          Already have an account?{" "}
          <Link href="/login">
            <strong>Log in</strong>
          </Link>
        </P>
      </div>
      <Form {...form}>
        <form
          noValidate
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input autoFocus type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Sign up</Button>
          {pending && <LoaderCircle className="animate-spin" />}
        </form>
      </Form>
      <P className={`${isError ? "text-red-600" : "text-black"}`}>{message}</P>
    </div>
  );
};

export default Page;
