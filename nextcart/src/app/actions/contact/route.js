export async function POST(req) {
  const data = await req.formData();
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  console.log('New message:', { name, email, message });
  return new Response(`Thanks, ${name}! We received your message.`, { status: 200 });
}
