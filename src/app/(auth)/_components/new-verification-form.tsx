"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BeatLoader } from "react-spinners";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/app/(auth)/_components";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";
import { useGlobalStore } from "@/providers";

const NewVerificationForm = () => {
  const {
    error,
    success,
    setError,
    setSuccess,
    reset: resetAuth,
  } = useGlobalStore((state) => state.auth);

  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? "";

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error, setError, setSuccess]);

  useEffect(() => {
    resetAuth();
    onSubmit();

    return () => resetAuth();
  }, [onSubmit, resetAuth]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader />}
        <FormSucess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export { NewVerificationForm };
