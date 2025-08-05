"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md">
        <CardHeader>
          <h2 className="text-xl font-bold text-danger">Something went wrong!</h2>
        </CardHeader>
        <CardBody>
          <p className="text-default-600 mb-4">
            An unexpected error occurred. Please try again.
          </p>
          <Button 
            color="primary" 
            onClick={() => reset()}
            className="w-full"
          >
            Try again
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
