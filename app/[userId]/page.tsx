import React from "react";

export default async function Fridge({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <div>{userId}</div>;
}
