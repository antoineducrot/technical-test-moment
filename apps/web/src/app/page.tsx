export const dynamic = "force-dynamic";

export default async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hello`);

  return <div>{JSON.stringify(response.body)}</div>;
}
