export async function GET(request: Request) {
  return new Response(JSON.stringify("Hello World!"), { status: 200 });
}
